require('dotenv').config({ path: require('find-config')('.env') });
/*
Entry point for the indexing script.
*/

const parseSources = require('./sources/parseSources.js');
const populate = require('./sources/populate.js');
const log = require('./log.js');
const _ = require('lodash');

( async () => {
    const entries = await parseSources.parse("./src/sources/sources.txt");
    console.log(entries);
    let failedDrivers = []
    for (let entry of entries) {
        try {
            await populate.runDriver(entry.driver, entry.args)
        }
        catch (err) {
            log("!entry", err.toString());
            failedDrivers.push(entry);
        }
    }
    // log which ones didn't work
    if (!_.isEmpty(failedDrivers)) {
        log("!entry", "These ones failed:");
        for (let entry of failedDrivers) {
            log("!entry", JSON.stringify(entry));
        }
    }
})();