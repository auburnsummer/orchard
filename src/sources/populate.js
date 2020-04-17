const _ = require('lodash');
const vitals = require('@auburnsummer/vitals');
const axios = require('axios');




const runDriver = async (driverName, args) => {
    const Driver = require(`./drivers/${driverName}.js`);

    const driver = new Driver(args);

    // get all the names...
    await driver.init();
    const iids = await driver.getIids();
    
    // get the vitals data and the driver-specific data
    const data = await Promise.all(_.map(iids, async (iid) => {
        const rdzip = await driver.get(iid);
        return Promise.all([vitals.analyse(rdzip), driver.expand(iid)])
    }));

    // cleaner format
    return _.map(data, ([vitalsData, driverData]) => {
        return {
            vitals: vitalsData,
            driver: driverData
        };
    })

    const uploads = await Promise.all(_.map(data, async (datum) => {

    }));
}












module.exports = {
    runDriver: runDriver
}