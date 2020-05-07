const _ = require('lodash');
const vitals = require('@auburnsummer/vitals');
const axios = require('axios');

const client = require('./client.js');

const log = require('../log.js');
const utils = require('../utils.js');

/**
 * Given an iid from a driver, return the level commands associated with that driver.
 * @param {*} driver 
 * @param {*} iid 
 */
const runDriverLevel = async (driver, iid) => {
    try {
        log(":driver", `Processing ${driver.submissionMethod} iid ${iid}...`)
        // if it's rehosting, we need to pass "all" to vitals. otherwise "nouploading".
        const profile = driver.rehost ? "all" : "noupload";

        const rdzip = await driver.get(iid);
        const [vitalsData, driverData] = await Promise.all([vitals.analyse(rdzip, profile), driver.expand(iid)]);
        
        // if rehost, it's ipfs:// + the hash, otherwise it's the driver-specific URL
        const downloadURL = driver.rehost ? "ipfs://" + vitalsData.rdzipIpfsHash : _.get(driverData, driver.urlPath);

        return client.levelCommands(vitalsData, downloadURL, driver.submissionMethod, iid);
    } catch(err) {
        log("!driver", `Error occured when processing ${driver.submissionMethod} iid ${iid}`);
        log("!driver", err);
        return Promise.resolve(false);
    }
}

/**
 * Given a driver name and associated arguments, return a list of level commands for that driver.
 * @param {*} driverName 
 * @param {*} args 
 */
const runDriver = async (driverName, args) => {
    const Driver = require(`./drivers/${driverName}.js`);

    const driver = new Driver(args);

    // run the driver-specified init script:
    await driver.init();

    log(":driver", `Initialised driver ${driver.submissionMethod}`);

    // Get the iids...
    const iids = await driver.getIids();
    
    // get the vitals data and the driver-specific data
    const data = await utils.mapSeries(iids, iid => runDriverLevel(driver, iid), 2);

    // some of the promises might be false
    const filteredData = _.filter(data);

    return filteredData;

    const uploads = await Promise.all(_.map(data, async (datum) => {

    }));
}












module.exports = {
    runDriver: runDriver
}