const _ = require("lodash");
const {removeKeys} = require("./utils");
const vitals = require("@auburnsummer/vitals");

// internal function.
const _getLevels = (knex, subquery) => {
	// add another select onto the subquery before we execute it
	// which gives it an order so that we can sort by it in the outer query
	const subquery2 = subquery.select(knex.raw("row_number() over ()"));

	return knex
		.select("a.*", "a.row_number", "b.tag", "b.seq as tag_seq", "c.author", "c.seq as author_seq", "g.name as group")
		.from(subquery2.as("a"))
		.orderBy("a.row_number", "asc")
		.leftJoin("orchard.level_tag as b", "a.id", "b.id")
		.leftJoin("orchard.level_author as c", "a.id", "c.id")
		.leftJoin("orchard.group as g", "a.group_id", "g.id")
		.then( (rows) => {
			// turn into documents rather than lots of duplicated container rows.
			// group by id...
			const getId = x => x.id;
			const groups = _.groupBy(rows, getId);
			// list of ids...
			const uniqueIds = _.uniq(_.map(rows, getId));
			// for each id...
			const combined = _.map(uniqueIds, (id) => {
				const group = groups[id];

				// monstrosity of a one liner, it does this:
				// unique by seq, sort by seq, map seq to the tags
				const p = _.property;
				const tags = _.map(_.sortBy(_.uniqBy(group, p("tag_seq")), p("tag_seq")), p("tag"));
				const authors = _.map(_.sortBy(_.uniqBy(group, p("author_seq")), p("author_seq")), p("author"));

				return {
					...(removeKeys(group[0], ["tag", "tag_seq", "author", "author_seq", "row_number"])),
					tags,
					authors
				};
			});
			return combined;
		});
};

/**
 * Get the levels. There's a few different variants:
 *  - this one lets you specify order, direction, limit, etc. it's for pagination
 */
const getLevels = ({knex, orders, limit, offset}) => {
	const base = knex("orchard.levelv")
		.select("*")
		.limit(limit)
		.offset(offset);
	const subquery = _.reduce(orders, (prev, curr) => prev.orderBy(...curr), base);
	
	return _getLevels(knex, subquery);
};

/**
 * - This one just gets all the levels.
 */
const getAllLevels = ({knex}) => {
	return _getLevels(
		knex,
		knex("orchard.levelv")
			.select("*")
	);
};

/**
 * - This one gets a list of ids and looks them up.
 */
const getLevelsFromIds = ({knex, ids}) => {
	return _getLevels(
		knex,
		knex.select("i2.*")
			.from("orchard.levelv as i2")
			.innerJoin(
				knex.raw("unnest(?::varchar(44)[]) with ordinality as j2(id, ord)", [ids]),
				"i2.id",
				"j2.id"
			)
			.orderBy("j2.ord")
	);
};

/**
 * This one gets just one level.
 */
const getLevelFromId = ({knex, id}) => {
	return _getLevels(
		knex,
		knex.select("*").from("orchard.levelv").where({id})
	)
		.then(_.head);
}

/**
 * do IID diffing -- this is where we compare the list of iids that a driver offers
 * with the list of iids we have stored. we bin/unbin when we can, then give back a list
 * of iids we don't know about yet.
 */
const iidDiff = async ({knex, group_id, proposed_iids}) => {
	const rows = await knex
		.select("id", "group_iid", "recycle_bin", "proposed_iid")
		.from("orchard.levelv as i")
		.fullOuterJoin(
			knex.raw("unnest(?::text[]) as j(proposed_iid)", [proposed_iids]),
			"i.group_iid",
			"j.proposed_iid"
		)
		.where((builder) => builder.where({group_id}).orWhereNull("i.group_id"));

	// levels we need to bin (iid is on our side and not on their side and not binned yet)
	const toBin = _.filter(rows, (row) => !_.isNull(row.group_iid) && _.isNull(row.proposed_iid) && !row.recycle_bin);
	// levels we need to unbin (iid is on our side and on their side but is binned)
	const toUnbin = _.filter(rows, (row) => !_.isNull(row.group_iid) && !_.isNull(row.proposed_iid) && row.recycle_bin);
	// levels we need to add (iid is not on our side and is on their side)
	const toAdd = _.filter(rows, (row) => _.isNull(row.group_iid) && !_.isNull(row.proposed_iid));

	// bin/unbin operations
	await Promise.all([
		knex("orchard.status")
			.whereIn("id", _.map(toBin, _.property("id")))
			.update({recycle_bin: true}),
		knex("orchard.status")
			.whereIn("id", _.map(toUnbin, _.property("id")))
			.update({recycle_bin: false})
	]);

	return {toBin, toUnbin, toAdd};
};

/**
 * Run vitals on an rdzip buffer and that's it
 */
const runVitals = (buffer) => {
	return vitals.analyse(buffer, "all");
};

/**
 * Upload level
 */
const uploadBuffer = (knex, buffer, {group_id, group_iid, uploaded, aux}) => {
	return vitals.analyse(buffer, "all")
		.then( async (vitalsData) => {
			const id = vitalsData.id;

			// first..... does it exist already?
			const couldBeLevel = await getLevelFromId({knex, id});
			if (couldBeLevel) {
				// throw the group_id and the group_iid of the offending party.
				throw _.pick(couldBeLevel, ['id', 'group_id', 'group_iid']);
			}
			

			const dataToInsert = {
				...removeKeys(vitalsData, ["tags", "authors"]),
				group_id,
				group_iid,
				aux: JSON.parse(aux)
			};

			return knex.transaction( (trx) => {
				return trx
					.insert(dataToInsert)
					.into("orchard.level")
					.then( () => {
						const tagsToInsert = _.map(vitalsData.tags, (tag, seq) => {
							return {id, tag, seq};
						});
						return trx("orchard.level_tag").insert(tagsToInsert);
					})
					.then( () => {
						const authorsToInsert = _.map(vitalsData.authors, (author, seq) => {
							return {id, author, seq};
						});
						return trx("orchard.level_author").insert(authorsToInsert);
					})
					.then( () => {
						return trx("orchard.status").insert({id, uploaded});
					});
			})
				.then( (inserts) => {
					return knex
						.select("*")
						.from("orchard.levelv")
						.where({id});
				});
		})
		.catch( (obj) => {
			if (_.has(obj, "id")) {
				// it's a conflict type error. add an "already exists" flag
				obj.alreadyExists = true;
				return obj;
			}
			// something in vitals. pass it on.
			throw obj;
		});
};

module.exports = {
	getLevels,
	iidDiff,
	runVitals,
	uploadBuffer,
	getAllLevels,
	getLevelsFromIds,
	getLevelFromId
};
