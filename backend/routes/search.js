const express = require("express");
const router = express.Router();

const search = require("../lib/search/search");
const _ = require("lodash");

router.post(
	"/",
	async (req, res, next) => {
		try {
			const {knex, body} = req;
			// search params we pass to meili
			const searchParams = [
				"offset", "limit", "filters", "facetFilters"
			];
			const searchQueries = _.reduce(searchParams, (prev, curr) => {
				if (_.has(body, curr)) {
					prev[curr] = body[curr];
				}
				return prev;
			}, {});
			const result = await search.doSearch(knex, body.q, searchQueries);
			return res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
