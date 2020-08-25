const express = require("express");
const router = express.Router();

const search = require("../lib/search/search");
const _ = require("lodash");

router.post(
	"/",
	async (req, res, next) => {
		return res.status(200).json("hello!");
	}
);

module.exports = router;
