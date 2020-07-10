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

const promiseUtils = require("./utils/promises");

console.error(process.env);

const processGroup = async ({id, driver, args}) => {
	const Driver = require(`./sources/drivers/${driver}`);
	const drive = new Driver(args);

	try {
		log(":driver", `Initialising driver... ${id}`);
		await drive.init();

		log(":driver", "...initialised!");

		// Get the iids...
		const iids = await drive.getIids();
		const addResult = await promiseUtils.mapSeries(iids, async (iid) => {
			try {
				log(":driver", `Fetching iid ${iid}...`);
				const rdzip = await drive.get(iid);
				const aux = await drive.expand(iid);
				log(":driver", `Uploading iid ${iid}...`);
				const req = await client.addLevel(id, rdzip, iid, aux);
				log("!JSON", JSON.stringify(req.data));
				return req.data;
			}
			catch (err) {
				log("!driver", err);
				return false;
			}
		}, 5);
		return _.filter(addResult);
	}
	catch (err) {
		log("!driver", err);
	}
	finally {
		try {
			await drive.cleanup();
		}
		catch (err) {
			log("!driver cleanup", err);
		}
	}

}

( async () => {
	const sourcePath = process.argv[2] || "sources.yml";
	const entries = await parseSources.parse(sourcePath);
	const groups = (await client.addGroups(entries)).data;
	
	const results = promiseUtils.mapSeries(entries, async (entry) => {
		return processGroup(entry)
			.catch(err => {
				log("!driver", err);
			});
	}, 2);
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
