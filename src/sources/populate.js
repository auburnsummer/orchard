const _ = require('lodash');
const vitals = require('@auburnsummer/vitals');
const axios = require('axios');

const client = require('./client.js');

/**
 * 
 * @param {*} driver 
 * @param {*} iid 
 */
const runDriverLevel = async (driver, iid) => {
    // are we rehosting?
    const profile = driver.rehost ? "all" : "noupload";

    const rdzip = await driver.get(iid);
    const [vitalsData, driverData] = await Promise.all([vitals.analyse(rdzip, profile), driver.expand(iid)]);
    
    // if rehost, it's ipfs:// + the hash, otherwise it's the driver-specific URL
    const downloadURL = driver.rehost ? "ipfs://" + vitalsData.rdzipIpfsHash : _.get(driverData, driver.urlPath);

    return client.levelCommands(vitalsData, downloadURL, driver.submissionMethod, iid);
}


const runDriver = async (driverName, args) => {
    const Driver = require(`./drivers/${driverName}.js`);

    const driver = new Driver(args);

    // run the driver-specified init script:
    await driver.init();

    // Get the iids...
    const iids = await driver.getIids();
    
    // get the vitals data and the driver-specific data
    const data = await Promise.all(_.map(iids, iid => runDriverLevel(driver, iid)));

    return data;

    const uploads = await Promise.all(_.map(data, async (datum) => {

    }));
}












module.exports = {
    runDriver: runDriver
}