const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const _ = require("lodash");

const vitals = require("@auburnsummer/vitals");

/**
 * Given an object, return a new object with the specified keys removed
 */
const removeKeys = (obj, keys) => _.pick(obj, _.difference(_.keys(obj), keys));

/**
 * get the levels.
 */
router.get("/", (req, res, next) => {
	const {knex, query} = req;
	console.log(query);
	const order = query.order || 'song';
	const dir = query.dir || 'asc';
	const limit = query.limit || 20;
	const offset = query.offset || 0;

	return knex
	.select("a.*", "b.tag", "b.seq as tag_seq", "c.author", "c.seq as author_seq", "g.name as group", "s.approval")
	.from(
		knex("orchard.level")
		.select("*")
		.limit(limit)
		.orderBy(order, dir)
		.offset(offset)
		.as("a")
	)
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
			}
		})
		return res.status(200).json(combined);
	})
	.catch(next);
})

/**
 * run vitals on an rdzip without anything else.
 */
router.post("/inspect", upload.single("rdzip"), (req, res, next) => {
	const {file} = req;

	return vitals.analyse(file.buffer, "all")
		.then( (vitalsData) => {
			return res.status(200).json(vitalsData);
		})
		.catch( (err) => {
			next(err);
		});
});

/**
 * upload an rdzip to the database and all that jazz
 */
router.post("/", upload.single("rdzip"), (req, res, next) => {
	const {knex, file, body} = req;
	console.log(file);

	return vitals.analyse(file.buffer, "all")
		.then( (vitalsData) => {
			const sha256 = vitalsData.sha256;

			const dataToInsert = {
				...removeKeys(vitalsData, ["tags", "authors"]),
				group_id: body.group_id,
				group_iid: body.group_iid,
				aux: JSON.parse(body.aux)
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
				})
				.then( (rows) => {
					return res.status(201).json(rows[0]);
				});
		})
		.catch( (err) => {
			console.log(err);
			next(err);
		});
});



module.exports = router;
