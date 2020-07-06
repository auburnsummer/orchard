const express = require("express");
const router = express.Router();

const _ = require("lodash");

router.get("/", (req, res) => {
	const {knex} = req;
	const query = knex
		.select("*")
		.from("orchard.group");

	return query
		.then( (rows) => {
			res.status(200).json(rows);
		});
});

router.post("/", (req, res, next) => {
	const {knex, body} = req;
	const query = knex("orchard.group")
		.insert(body)
		.returning("*");

	return query
		.then( (rows) => {
			res.status(201).json(rows);
		})
		.catch( (err) => {
			next(err);
		});
});


module.exports = router;
