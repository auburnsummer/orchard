/**
 * Provide functions to log data so I can look at it later if there's errors.
 */

const LOG_FILE = "/tmp/orchard.log";
const fs = require("fs");

const stream = fs.createWriteStream(LOG_FILE, {flags:"a"});

/**
 * Logs an object.
 * type: The type of the log. Prefixes:
 *  - '!' : error
 *  - ':' : normal message
 */
module.exports = (type, object) => {
	try {
		const s = `[${type}] ${object.toString()}\n`;
		console.error(s);
	}
	catch (err) {
		// okay now we're REALLY in trouble I guess
	}
};
