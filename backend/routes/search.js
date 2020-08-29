const express = require("express");
const router = express.Router();

const search = require("../lib/search/search");
const _ = require("lodash");
const { getLevelsFromIds } = require("../lib/levels");

router.post(
	"/",
	async (req, res, next) => {
		const {knex, body} = req;
		const {q, limit, offset, showUnapproved} = body;
		const results = await search.doSearch(q, showUnapproved, limit, offset);
		const ids = results.hits.map(h => h._id);
		const total = results.total.value;
		const levels = await getLevelsFromIds({knex, ids});
		return res.status(200).json({
			total,
			levels
		});
	}
);

module.exports = router;
