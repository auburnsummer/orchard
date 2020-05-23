// Test driver, stubbing the functions that drivers should implement.

// A driver is just a standardised set of functions which implement getting levels from a source.

const _ = require("lodash");
const axios = require("axios");

module.exports = class {
	constructor({submissionMethod, rehost}) {
		this.submissionMethod = submissionMethod;

		this.rehost = rehost;

		this.urlPath = "url";
	}

	async init() {
		this.testData = require("./testData.json");
	}

	async getIids() {
		return _.map(this.testData, (level) => level._id);
	}

	async expand(iid) {
		return _.find(this.testData, (level) => level._id === iid);
	}

	async get(iid) {
		const url = await (await this.expand(iid)).url;
		const resp = await axios({
			method: "get",
			url: url,
			responseType: "arraybuffer"
		});
		return resp.data;
	}

	async onChangeHook() {

	}

	async cleanup() {
		console.log("cleanup");
	}
};
