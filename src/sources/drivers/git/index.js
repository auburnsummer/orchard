const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
const pfs = fs.promises;
const del = require("del");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

module.exports = class {
	constructor({cloneURL}) {
		this.cloneURL = cloneURL;
		this.submissionMethod = `Git repo: ${cloneURL}`;
		this.rehost = true;
	}

	async init() {
		this.tmpdir = `/tmp/orchard_git_${uuidv4()}`;
		await pfs.mkdir(this.tmpdir);
		await git.clone({
			fs: fs,
			http: http,
			url: this.cloneURL,
			depth: 1,
			dir: this.tmpdir,
		});
		console.log(this.tmpdir);
		// get files ending with .rdzip and their corresponding oids
		this.files = await git.walk({
			fs: fs,
			dir: this.tmpdir,
			trees: [git.TREE("HEAD")],
			map: async (filepath, [we]) => {
				if (_.endsWith(_.toLower(filepath), ".rdzip")) {
					return {
						oid: await we.oid(),
						filepath: filepath
					};
				}
			}
		});
	}

	// Return an array of iids. This is some parameter which has both the following properties:
	//  - An iid maps to exactly one level;
	//  - If the level changes, the iid also changes.

	// for instance, you can't edit a level in Discord without reuploading it, so the URL can be the IID.
	// however, you can edit Steam Workshop levels, so for Workshop the IID needs to be a combination of
	// the last updated date and the level ID.
	async getIids() {
		return _.map(this.files, (f) => f.oid);
	}

	// Given an IID, return a full driver-specific object.
	async expand(iid) {
		return _.find(this.files, (f) => f.oid === iid);
	}

	// Given an IID, return the rdzip that maps to that IID as a buffer (i.e. download the level)
	async get(iid) {
		const resp = await git.readBlob({
			fs: fs,
			dir: this.tmpdir,
			oid: iid
		});
		return Buffer.from(resp.blob.buffer);
	}

	// A function which gets called whenever Orchard adds or removes a level from this source.
	async onChangeHook() {

	}

	// A function which gets called after the driver is done, including on errors.
	async cleanup() {
		return del(this.tmpdir, {force: true});
	}

};
