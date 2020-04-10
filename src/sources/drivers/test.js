// Test driver, stubbing the functions that drivers should implement.

// A driver is just a standardised set of functions which implement getting levels from a source.

const _ = require('lodash');
const axios = require('axios');

module.exports = class {
    constructor() {
        // the individual identifier key name. This is some parameter which has both the following properties:
        //  - An iid maps to exactly one level;
        //  - If the level changes, the iid also changes.
        // for instance, you can't edit a level in Discord without reuploading it, so the URL can be the IID.
        // however, you can edit Steam Workshop levels, so for Workshop the IID needs to be a combination of the last updated
        // date and the level ID.
        this.iidKey = 'url';
        return this;
    }

    // A function which is called when the driver is loaded. Doesn't _have_ to do anything.
    async init() {
        this.testData = require('./testData.json');
        console.log("init!");
    }

    // Return an array of iids.
    // TODO: pagination?
    async getIids() {
        return _.map(this.testData, (level) => level.url);
    }

    // Given an IID, expand it to return a full object.
    async expand(iid) {
        return _.find(this.testData, (level) => level.url === iid);
    }

    // Given an IID, return the rdzip that maps to that IID as an arraybuffer.
    // (i.e. download the level)
    async get(iid) {
        const resp = await axios({
            method: 'get',
            url: iid,
            responseType: 'arraybuffer'
        });
        return resp.data;
    }

    // A function which gets called whenever Orchard adds or removes a level from
    // this source. (e.g. webhooks)
    async onChangeHook() {

    }
    
}