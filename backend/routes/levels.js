const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const levels = require("../lib/levels.js");

const requireAuth = require("../middleware/auth.js");

/**
 * get the levels.
 */
router.get("/", (req, res, next) => {
	const {knex, query} = req;
	const order = query.order || "song";
	const dir = query.dir || "asc";
	const limit = query.limit || 20;
	const offset = query.offset || 0;

	return levels.getLevels({knex, order, dir, limit, offset})
		.then( (levels) => {
			return res.status(200).json(levels);
		})
		.catch(next);
});


/**
 * Update a level
 */
router.patch("/status/:sha256", requireAuth, (req, res, next) => {
	const {knex, params, body} = req;
	console.log(params);

	return knex("orchard.status")
		.where(params)
		.update(body)
		.returning("*")
		.then( (rows) => {
			return res.status(200).json(rows[0]);
		})
		.catch(next);
});

/**
 * perform an iid diffing operation
 */
router.post("/diff", requireAuth, async (req, res, next) => {
	const {knex, body} = req;
	const {group_id, proposed_iids} = body;

	return levels.iidDiff({knex, group_id, proposed_iids})
		.then( (data) => {
			return res.status(200).json(data);
		})
		.catch(next);
});

/**
 * run vitals on an rdzip without anything else.
 */
router.post("/inspect", upload.single("rdzip"), (req, res, next) => {
	const {file} = req;

	return levels.runVitals(file.buffer)
		.then( (vitalsData) => {
			return res.status(200).json(vitalsData);
		})
		.catch(next);
});

/**
 * upload an rdzip to the database and all that jazz
 */
router.post("/", requireAuth, upload.single("rdzip"), (req, res, next) => {
	const {knex, file, body} = req;

	return levels.uploadBuffer(knex, file.buffer, body)
		.then( (data) => {
			return res.status(201).json(data);
		})
		.catch(next);

});



module.exports = router;
