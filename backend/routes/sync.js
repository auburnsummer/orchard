const express = require("express");
const router = express.Router();

const _ = require("lodash");

const levels = require("../lib/levels.js");
const sync = require("../lib/search/search.js");

const requireAuth = require("../middleware/auth.js");

router.post(
	"/",
	requireAuth,
	async (req, res, next) => {
		try {
			const isUp = await sync.isIndexCreated();
			if (isUp) {
				// do nothing...
			}
			else {
				console.log("making the index...");
				const index = await sync.makeIndex();
			}
	
			const {knex} = req;
	
			const allLevels = await levels.getAllLevels({knex});
	
	
	
			const upload = await sync.updateIndexes(allLevels);
	
			return res.status(201).json(upload);
		}
		catch (err) {
			return res.status(500).json(err);
		}

		// try {
		// 	const {knex} = req;

		// 	// get ALL the levels
		// 	const allLevels = await levels.getAllLevels({knex});

		// 	// which attributes actually need to go to meili too?
		// 	const attributesToSend = [
		// 		"id", "tags", "authors", "group", "song",
		// 		"artist", "description", "difficulty", "approval", "recycle_bin"
		// 	];

		// 	const readyToSend = _.map(allLevels, (level) => _.pick(level, attributesToSend));

		// 	// drop that bad boy in meili
		// 	const configResult = await sync.updateConfig();
		// 	const uploadResult = await sync.updateIndexes(readyToSend);

		// 	return res.status(200).json([configResult, uploadResult]);
		// } catch (err) {
		// 	next(err);
		// }
	}
);

module.exports = router;
