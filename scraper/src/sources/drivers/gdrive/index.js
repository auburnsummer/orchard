const { google } = require('googleapis');
const _ = require('lodash');

const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
const fields = "*";


module.exports = class {
	constructor({folderID}) {
		this.rehost = true;

		this.urlPath = "";

		this.folderID = folderID;
	}

	// Returns some unique string representation of this driver.
	serialise() {
		return `Google Drive:: ${this.folderID}`;
	}

	async init() {
		const oclient = new google.auth.GoogleAuth({scopes: SCOPES});
		const authClient = await oclient.getClient();
		
		const drive = google.drive({version: "v3", auth: authClient});
		this.drive = drive;
	}

	async getIids() {
		const results = await this.drive.files.list({q: `'${this.folderID}' in parents`, fields: fields});
		const isAFolder = (x) => x.mimeType === "application/vnd.google-apps.folder";

		let fileList = results.data.files;
		// dig down folders until we've found all the files.
		while (_.some(fileList, isAFolder)) {
			fileList = await _.reduce(fileList, async (prev, curr) => {
				const resolved = await prev;
				if (isAFolder(curr)) {
					const q = `'${curr.id}' in parents`;
					const moreResults = await this.drive.files.list({q, fields})
					return _.concat(resolved, moreResults.data.files);
				} else {
					return _.concat(resolved, curr);
				}
			}, []);
		}

		this.fileList = fileList;
		return _.map(this.fileList, (rus) => `${rus.id}_${rus.modifiedTime}`);
	}

	// Given an IID, return a full driver-specific object.
	async expand(iid) {
		const [id,] = _.split(iid, "_");
		return _.find(this.results, (rus) => rus.id === id);
	}

	// Given an IID, return the rdzip that maps to that IID as an arraybuffer (i.e. download the level)
	async get(iid) {
		console.log("fefefef");
		console.log("whfewfef");
	}

	// A function which gets called whenever Orchard adds or removes a level from this source.
	async onChangeHook() {

	}

	// A function which gets called after the driver is done, including on errors.
	async cleanup() {

	}

};

/* eslint-enable */
