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
const moment = require("moment");

const promiseUtils = require("./utils/promises");

console.error(process.env);

const processGroup = async (entry, entryIndex, entries, currTime) => {
	const {id, driver, args} = entry;
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
				let resp;
				try {
					resp = await client.addLevel(id, rdzip, iid, currTime, aux);
				}
				catch (err) {
					if (err.response.status === 300) {
						// 300 means it already exists in the database. if our group is higher prio
						// we can just change the group_id, otherwise leave it alone
						const data = err.response.data;
						log(":driver", "Conflict:");
						log(":driver", JSON.stringify(data));
						const theirIndex = _.findIndex(entries, entry => entry.id === data.group_id);
						if (entryIndex < theirIndex) {
							log(":driver", "We're higher prio!");
							const updateResponse = await client.updateLevel(data.id, {
								group_id: id,
								group_iid: iid
							});
							log(":driver", JSON.stringify(updateResponse.data));
						} else {
							log(":driver", "Leaving it alone...");
						}
					} else {
						throw err;
					}
				}

				log("!JSON", JSON.stringify(resp.data));
				return resp.data;
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

	let currTime;

	while (true) {
		const sourcePath = process.argv[2] || "/var/conf/sources.yml";
		const entries = await parseSources.parse(sourcePath);
		const groups = (await client.addGroups(entries)).data;

		let currTime = new moment();
		const results = await promiseUtils.mapSeries(entries, async (entry, idx, entries) => {
			return processGroup(entry, idx, entries, currTime)
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
