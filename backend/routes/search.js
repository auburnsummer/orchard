const express = require("express");
const router = express.Router();

const search = require("../lib/search/search");
const _ = require("lodash");
const schema = require("../middleware/schema");

router.get(
	"/",
	schema({
		query: {
			type: "object",
			properties: {
				q: {
					type: "string"
				}
			},
			required: ["q"]
		}
	}),
	async (req, res, next) => {
		try {
			const {knex, query} = req;
			// search params we pass to meili
			const searchParams = [
				"offset", "limit", "filters", "facetFilters"
			];
			const searchQueries = _.reduce(searchParams, (prev, curr) => {
				if (_.has(query, curr)) {
					prev[curr] = query[curr];
				}
				return prev;
			}, {});
			const result = await search.doSearch(knex, query.q, searchQueries);
			return res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
