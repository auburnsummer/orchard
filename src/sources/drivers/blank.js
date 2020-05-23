
// A driver is a standardised set of functions which implement getting levels from a source.
// implement these to add support for a service.

/* eslint-disable */
module.exports = class {
	// The driver constructor can take any arbitary number of arguments as required, but...
	constructor({}) {
		// ...it has to at least expose these three properties:

		// submissionMethod: A human-readable submission method. Should be unique.
		this.submissionMethod = "Example";

		// If true, Orchard will rehost the rdzips on IPFS and use that for the download link.
		this.rehost = false;

		// If rehost is false, this needs to be a path from an object returned by expand() to a direct download URL.
		this.urlPath = "example";
	}

	// A function which is called when the driver is loaded.
	async init() {

	}

	// Return an array of iids. This is some parameter which has both the following properties:
	//  - An iid maps to exactly one level;
	//  - If the level changes, the iid also changes.

	// for instance, you can't edit a level in Discord without reuploading it, so the URL can be the IID.
	// however, you can edit Steam Workshop levels, so for Workshop the IID needs to be a combination of
	// the last updated date and the level ID.
	async getIids() {

	}

	// Given an IID, return a full driver-specific object.
	async expand(iid) {

	}

	// Given an IID, return the rdzip that maps to that IID as an arraybuffer (i.e. download the level)
	async get(iid) {

	}

	// A function which gets called whenever Orchard adds or removes a level from this source.
	async onChangeHook() {

	}

	// A function which gets called after the driver is done, including on errors.
	async cleanup() {

	}

};

/* eslint-enable */
