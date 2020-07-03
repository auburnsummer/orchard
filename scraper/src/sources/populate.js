const _ = require("lodash");
const vitals = require("@auburnsummer/vitals");

const client = require("./client.js");

const log = require("../utils/log.js");
const promiseUtils= require("../utils/promises.js");


const SIMUTANEOUS_PROCESSING = 2;

/**
 * Given an iid from a driver, return the level commands associated with that driver.
 * @param {*} driver
 * @param {*} iid
 */
const processIid = async (driver, humanName, iid) => {
	try {
		log(":driver", `Processing ${driver.serialise()} (${humanName}) iid ${iid}...`);
		const profile = "all";
		const rdzip = await driver.get(iid);
		const [vitalsData, driverData] = await Promise.all([vitals.analyse(rdzip, profile), driver.expand(iid)]);
		// if rehost, it's ipfs:// + the hash, otherwise it's the driver-specific URL
		const downloadURL = driver.rehost ? "ipfs://" + vitalsData.rdzip_ipfs : _.get(driverData, driver.urlPath);
		log(":driver", `Uploading ${driver.serialise()} iid ${iid}...`);
		await client.addLevel(vitalsData, downloadURL, driver.serialise(), iid, humanName, driverData);
		return Promise.resolve(true);
	} catch(err) {
		log("!driver", `Error occured when processing ${driver.serialise()} iid ${iid}`);
		log("!driver", err);
		return Promise.resolve(false);
	}
};

/**
 * Divide iids into groups as follows:
 *  - add: levels that need to be added
 *  - bin: levels that need to be binned
 *  - unbin: levels that need to be unbinned
 * Levels that need to be ignored are just not in any of the lists at all.
 *  see https://user-images.githubusercontent.com/37142182/85217954-01576000-b3d9-11ea-967f-1fdb6c5bdb3d.png
 * @param {*} method
 * @param {*} iids
 */
const getIidGroups = async (method, iids) => {
	const levels = await client.getIidDiffs(method, iids);

	// things in the request that are not in the database
	const add = _.map(_.filter(levels,
		(level) => !_.isNull(level.proposed_iid) && _.isNull(level.iid)),
	(level) => level.proposed_iid);

	// things that are not in the request but are in the database AND are not already binned
	const bin = _.map(_.filter(levels,
		(level) => !_.isNull(level.iid) && (!level.recycle_bin)),
	(level) => level.iid);

	// things that are in the request and also in the database, but are currently binned
	const unbin = _.map(_.filter(levels,
		(level) => level.iid === level.proposed_iid && level.recycle_bin),
	(level) => level.iid);

	return {add, bin, unbin};
};

/**
 * Given a driver name and associated arguments, do that driver
 * @param {*} driverName
 * @param {*} args
 */
const runDriver = async (driverName, humanName, args) => {
	const Driver = require(`./drivers/${driverName}`);

	const driver = new Driver(args);

	let data;
	try {
		log(":driver", `Initialising driver ...`);


		await driver.init();

		log(":driver", `...initialised driver ${driver.serialise()}`);

		// Get the iids...
		const iids = await driver.getIids();

		// split the iids into groups according to what we need to do with them.
		const {add, bin, unbin} = await getIidGroups(driver.serialise(), iids);


		log(":driver", `Adding ${add.length}, binning ${bin.length}, unbinning ${unbin.length}`);

		// do the bins as well
		const binResult =  await client.recycleBin(driver.serialise(), bin, true);
		const unbinResult = await client.recycleBin(driver.serialise(), unbin, false);
		const addResult = await promiseUtils.mapSeries(add, iid => processIid(driver, humanName, iid), SIMUTANEOUS_PROCESSING);


		data = {binResult, unbinResult, addResult};
	}
	catch (err) {
		log("!driver", err);
	}
	finally {
		try {
			await driver.cleanup();
		}
		catch (err) {
			log("!driver cleanup", err);
		}
	}

	return data;
};












module.exports = {
	runDriver: runDriver
};
