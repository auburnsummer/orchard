require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});
/*
Entry point for the indexing script.
*/

const parseSources = require("./sources/parseSources.js");
const log = require("./utils/log.js");
const _ = require("lodash");
const client = require("./sources/client.js");

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

		// which ones do we need to add?
		const {toAdd, toBin, toUnbin} = (await client.getIidDiffs(id, iids)).data;
		log(":driver", `${iids.length} levels: adding ${toAdd.length}, binned ${toBin.length}, unbinned ${toUnbin.length}`);
		const iidsToAdd = _.map(toAdd, _.property("proposed_iid"));

		const addResult = await promiseUtils.mapSeries(iidsToAdd, async (iid, idx) => {
			try {
				log(":driver", `(${idx}/${iids.length}) {Fetching iid ${iid}...`);
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

};

( async () => {
	// wait for it to connect....
	log(":connect", "Waiting for a connection...");
	while (true) {
		try {
			const up = await client.serverUp();
			if (up) {
				break;
			}
		}
		catch (err) {
			continue;
		}
	}
	log(":connect", "Connected!");

	while (true) {
		const sourcePath = process.argv[2] || "/var/conf/sources.yml";
		const entries = await parseSources.parse(sourcePath);
		const groups = (await client.addGroups(entries)).data;

		const results = await promiseUtils.mapSeries(entries, async (entry) => {
			return processGroup(entry)
				.catch(err => {
					log("!driver", err);
				});
		}, 1);
		log(":sync", "Syncing search...");
		await client.sync();
		log(":sync", "Synced!");

		log(":wait", `Waiting ${process.env.TIME_TO_WAIT_BETWEEN_INVOCATIONS} seconds before the next index...`);
		await new Promise( (resolve) => setTimeout(resolve, parseInt(process.env.TIME_TO_WAIT_BETWEEN_INVOCATIONS)*1000) );
	}
})();
