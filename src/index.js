require("dotenv").config({ path: require("find-config")(".env") });
/*
Entry point for the indexing script.
*/

const parseSources = require("./sources/parseSources.js");
const populate = require("./sources/populate.js");
const log = require("./log.js");
const _ = require("lodash");

( async () => {
	const sourcePath = process.argv[2] || "./src/sources/sources.txt";
	const entries = await parseSources.parse(sourcePath);
	console.log(entries);
	const failedDrivers = [];
	for (const entry of entries) {
		try {
			await populate.runDriver(entry.driver, entry.args);
		}
		catch (err) {
			log("!entry", err.toString());
			failedDrivers.push(entry);
		}
	}
	// log which ones didn't work
	if (!_.isEmpty(failedDrivers)) {
		log("!entry", "These ones failed:");
		for (const entry of failedDrivers) {
			log("!entry", JSON.stringify(entry));
		}
	}
})();
