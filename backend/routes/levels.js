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

	const levels = knex("orchard.level")
		.select("*")
		.orderBy(order, dir)
		.limit(limit)
		.offset(offset)
		.as('i');

	return knex
		.select("*")
		.from(levels)
		.then( (rows) => {
			return res.status(200).json(rows);
		})
		.catch(next);

	// return knex("orchard.level")
	// 	.select("*")
	// 	.orderBy(order, dir)
	// 	.limit(limit)
	// 	.offset(offset)
	// 	.leftJoin("orchard.level_tag", "orchard.level_tag.sha256", "orchard.level.sha256")
	// 	.then( (rows) => {
	// 		return res.status(200).json(rows);
	// 	})
	// 	.catch(next);
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
