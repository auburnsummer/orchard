/**
 * Middleware for endpoints which require authentication.
 *
 * Orchard doesn't actually have user accounts, etc. so this is fairly simple. we just have
 * one "api key" that only I have
 */
const _ = require("lodash");

module.exports = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({error: true, message: "No authorization header sent!"});
	}
	const [type, token] = _.split(req.headers.authorization, " ");
	if (token !== process.env.API_KEY) {
		return res.status(403).json({error: true, message: "Authorization token incorrect!"});
	}
	next();
};
