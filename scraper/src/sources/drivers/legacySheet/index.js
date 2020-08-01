
const axios = require("axios");
const _ = require("lodash");
const DL = require("../../../utils/download");

const API_URL = "https://script.google.com/macros/s/AKfycbzm3I9ENulE7uOmze53cyDuj7Igi7fmGiQ6w045fCRxs_sK3D4/exec";

/* eslint-disable */
module.exports = class {
	// The driver constructor can take any arbitary number of arguments as required, but...
	constructor({}) {
		// ...it has to at least expose these two properties:

		// If true, Orchard will rehost the rdzips on IPFS and use that for the download link.
		this.rehost = false;

		// If rehost is false, this needs to be a path from an object returned by expand() to a direct download URL.
		this.urlPath = "iid";
	}

	// Returns some unique string representation of this driver.
	serialise() {
        return "Legacy google sheet";
	}

	// A function which is called when the driver is loaded.
	async init() {
        this.data = await axios({
            method: "GET",
            url: API_URL
        })
            .then( (resp) => {
                return resp.data;
            })
	}

	// Return an array of iids. This is some parameter which has both the following properties:
	//  - An iid maps to exactly one level;
	//  - If the level changes, the iid also changes.

	// for instance, you can't edit a level in Discord without reuploading it, so the URL can be the IID.
	// however, you can edit Steam Workshop levels, so for Workshop the IID needs to be a combination of
	// the last updated date and the level ID.
	async getIids() {
		// return _.map(_.filter(this.data, _.property("verified")), (x) => x.download_url);
		return _.map(this.data, (x) => x.download_url);
	}

	// Given an IID, return a full driver-specific object.
	async expand(iid) {
		const fullObject = _.find(this.data, (x) => x.download_url === iid);
		return {
			iid: fullObject.download_url,
			approved: fullObject.verified || false
		};
	}

	// Given an IID, return the rdzip that maps to that IID as an arraybuffer (i.e. download the level)
	async get(iid) {
        const resp = await DL(iid);
		return resp.data;
	}

	// A function which gets called whenever Orchard adds or removes a level from this source.
	async onChangeHook() {

	}

	// A function which gets called after the driver is done, including on errors.
	async cleanup() {

	}

};

/* eslint-enable */
