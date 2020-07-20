const express = require("express");
const router = express.Router();

const search = require("../lib/search/search");
const _ = require("lodash");

router.get("/", async (req, res, next) => {
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
});

module.exports = router;