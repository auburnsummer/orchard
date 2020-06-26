

const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

const FOLDER_ID = "11v84dOUiwtUM9zMUpFgs4ubJtXB1kJ1J";

require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});

const { google } = require('googleapis');
const _ = require('lodash');

const oclient = new google.auth.GoogleAuth({scopes: SCOPES});
const authClient = await oclient.getClient();

const drive = google.drive({version: "v3", auth: authClient});

const results = await drive.files.list({q: `'${FOLDER_ID}' in parents`})

let fileList = results.data.files;

const isAFolder = (x) => x.mimeType === "application/vnd.google-apps.folder";

// dig down folders until we've found all the files.
while (_.some(fileList, isAFolder)) {
	fileList = await _.reduce(fileList, async (prev, curr) => {
		const resolved = await prev;
		if (isAFolder(curr)) {
			const q = `'${curr.id}' in parents`;
			const moreResults = await drive.files.list({q})
			return _.concat(resolved, moreResults.data.files);
		} else {
			return _.concat(resolved, curr);
		}
	}, [])
}

console.log(fileList);