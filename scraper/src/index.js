require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});
/*
Entry point for the indexing script.
*/

const parseSources = require("./sources/parseSources.js");
const populate = require("./sources/populate.js");
const log = require("./utils/log.js");
const _ = require("lodash");
const client = require('./sources/client.js');

console.error(process.env);

( async () => {
	const sourcePath = process.argv[2] || "sources.yml";
	const entries = await parseSources.parse(sourcePath);
	console.error(entries);
	const groups = await client.addGroups(entries);
	// const failedDrivers = [];
	// for (const entry of entries) {
	// 	try {
	// 		await populate.runDriver(entry.driver, entry.name, entry.args);
	// 	}
	// 	catch (err) {
	// 		log("!entry", err.toString());
	// 		failedDrivers.push(entry);
	// 	}
	// }
	// // log which ones didn't work
	// if (!_.isEmpty(failedDrivers)) {
	// 	log("!entry", "These ones failed:");
	// 	for (const entry of failedDrivers) {
	// 		log("!entry", JSON.stringify(entry));
	// 	}
	// }
})();
