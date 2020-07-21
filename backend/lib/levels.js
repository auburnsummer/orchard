const _ = require("lodash");
const {removeKeys} = require("./utils");
const vitals = require("@auburnsummer/vitals");

// internal function.
const _getLevels = (knex, subquery) => {
	return knex
		.select("a.*", "b.tag", "b.seq as tag_seq", "c.author", "c.seq as author_seq", "g.name as group", "s.approval")
		.from(subquery.as("a"))
		.leftJoin("orchard.level_tag as b", "a.sha256", "b.sha256")
		.leftJoin("orchard.level_author as c", "a.sha256", "c.sha256")
		.leftJoin("orchard.group as g", "a.group_id", "g.id")
		.leftJoin("orchard.status as s", "a.sha256", "s.sha256")
		.then( (rows) => {
		// turn into documents rather than lots of duplicated container rows.
		// group by sha256...
			const groups = _.groupBy(rows, _.property("sha256"));
			// for each group...
			const combined = _.map(_.keys(groups), (sha256) => {
				const group = groups[sha256];

				// monstrosity of a one liner, it does this:
				// unique by the sequence, sort by the sequence, map the sequence to tags
				const p = _.property;
				const tags = _.map(_.sortBy(_.uniqBy(group, p("tag_seq")), p("tag_seq")), p("tag"));
				const authors = _.map(_.sortBy(_.uniqBy(group, p("author_seq")), p("author_seq")), p("author"));

				return {
					...(removeKeys(group[0], ["tag", "tag_seq", "author", "author_seq"])),
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
const getLevels = ({knex, order, dir, limit, offset}) => {
	return _getLevels(
		knex,
		knex("orchard.level")
			.select("*")
			.limit(limit)
			.orderBy(order, dir)
			.offset(offset)
	);
};

/**
 * - This one just gets all the levels.
 */
const getAllLevels = ({knex}) => {
	return _getLevels(
		knex,
		knex("orchard.level")
			.select("*")
	);
};

/**
 * - This one gets a list of sha256 hashes and looks them up.
 */
const getLevelsFromHashes = ({knex, hashes}) => {
	return _getLevels(
		knex,
		knex("orchard.level")
			.select("*")
			.whereIn("sha256", hashes)
	);
};

/**
 * do IID diffing -- this is where we compare the list of iids that a driver offers
 * with the list of iids we have stored. we bin/unbin when we can, then give back a list
 * of iids we don't know about yet.
 */
const iidDiff = async ({knex, group_id, proposed_iids}) => {
	const rows = await knex
		.select("i.sha256", "group_iid", "recycle_bin", "proposed_iid")
		.from("orchard.level as i")
		.leftJoin("orchard.status as k", "i.sha256", "k.sha256")
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
			.whereIn("sha256", _.map(toBin, _.property("sha256")))
			.update({recycle_bin: true}),
		knex("orchard.status")
			.whereIn("sha256", _.map(toUnbin, _.property("sha256")))
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
const uploadBuffer = (knex, buffer, {group_id, group_iid, aux}) => {
	return vitals.analyse(buffer, "all")
		.then( (vitalsData) => {
			const sha256 = vitalsData.sha256;

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
							return {sha256, tag, seq};
						});
						return trx("orchard.level_tag").insert(tagsToInsert);
					})
					.then( () => {
						const authorsToInsert = _.map(vitalsData.authors, (author, seq) => {
							return {sha256, author, seq};
						});
						return trx("orchard.level_author").insert(authorsToInsert);
					})
					.then( () => {
						return trx("orchard.status").insert({sha256});
					});
			})
				.then( (inserts) => {
					return knex
						.select("*")
						.from("orchard.level")
						.where({sha256});
				});
		});
};

module.exports = {
	getLevels,
	iidDiff,
	runVitals,
	uploadBuffer,
	getAllLevels,
	getLevelsFromHashes
};
