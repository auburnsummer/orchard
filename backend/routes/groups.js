const express = require("express");
const router = express.Router();

const _ = require("lodash");

const requireAuth = require("../middleware/auth.js");

// get the groups
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

// upsert groups
router.put("/", requireAuth, async (req, res, next) => {
	const {knex, body} = req;

	const existingIds1 = await knex
		.select("id")
		.from("orchard.group");
	
	
	const existingIds = existingIds1.map(i => i.id);


	return Promise.all(_.map(body, (group) => {
		// does the group exist?
		if (_.includes(existingIds, group.id)) {
			// update
			return knex("orchard.group")
				.where({id: group.id})
				.update(group)
				.returning("*");
		} else {
			// insert
			return knex("orchard.group")
				.insert(group)
				.returning("*");
		}
	}))
		.then( (rows) => {
			res.status(201).json(rows);
		})
		.catch(next);
});

module.exports = router;
