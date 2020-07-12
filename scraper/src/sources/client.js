const _ = require("lodash");
const axios = require("axios");
const log = require("../utils/log");

const promiseUtils = require("../utils/promises");
const FormData = require('form-data');

const getIidDiffs = (group_id, proposed_iids) => {
	return axios({
		method: 'POST',
		url: `${process.env.SERVER}/levels/diff`,
		data: {group_id, proposed_iids}
	});
}

const addGroups = (data) => {
	const dataToSend = _.map(data, (group) => {
		return _.pick(group, ["name", "id", "website", "description"]);
	});
	return axios({
		method: 'PUT',
		url: `${process.env.SERVER}/groups`,
		data: dataToSend
	});
}

const addLevel = (group_id, rdzip, group_iid, aux) => {
	const form = new FormData();
	form.append('group_id', group_id);
	form.append('group_iid', group_iid);
	form.append('rdzip', rdzip, `${group_iid}.rdzip`);
	form.append('aux', JSON.stringify(aux));

	const formHeaders = form.getHeaders();
	return axios.post(`${process.env.SERVER}/levels`, form.getBuffer(), {
		headers: formHeaders,
		maxContentLength: Infinity,
		maxBodyLength: Infinity,
	});

}

// /**
//  * Add a level to the database.
//  *
//  * @param data The data to be sent (typically directly from vitals);
//  * @param downloadURL The download URL for the level. This is either of the form ipfs://<ipfs hash> or http[s]://<path to rdzip>.
//  *                    It's always a direct link.
//  * @param submissionMethod A string of the submission method. This needs to be unique.
//  * @param iid The driver-specific individual id
//  * @param humanName Human name of the driver ("group") for display purposes.
//  * @param driverData driver-specific data which just gets dumped in the submission_info field.
//  */
// const addLevel = (data, downloadURL, submissionMethod, iid, humanName, driverData) => {
// 	// level. direct from data except the "tags" and "authors", then add some
// 	// of the other things as well

// 	const levelPartial = _.pick(data, _.difference(_.keys(data), ["tags", "authors"]));

// 	const level = _.merge(
// 		levelPartial,
// 		{
// 			submission_method: submissionMethod,
// 			human_name: humanName,
// 			submission_iid: iid,
// 			download_url: downloadURL,
// 			submission_info: JSON.stringify(driverData)
// 		}
// 	);

// 	// aux data
// 	const aux = {
// 		sha256: data.sha256
// 	};

// 	const dataToSend = {
// 		level: level,
// 		aux: aux,
// 		tags: data.tags,
// 		authors: data.authors
// 	};
// 	log("JSON", JSON.stringify(dataToSend));

// 	const endpoint = `${process.env.POSTGREST_SERVER}/rpc/add_level`;

// 	return axios({
// 		method: "POST",
// 		url: endpoint,
// 		data: dataToSend,
// 		headers: {
// 			authorization: `Bearer ${process.env.POSTGREST_TOKEN}`,
// 			prefer: "params=single-object",
// 			"content-type" : "application/json"
// 		}
// 	});
// };

/**
 * Recycle bin some levels
 * @param {*} method
 * @param {*} iids
 */
const recycleBin = (method, iids, bin) => {
	const batchSize = 10; // todo: determine this empirically
	const batches = _.chunk(iids, batchSize);
	const endpoint = `${process.env.POSTGREST_SERVER}/aux`;
	return promiseUtils.mapSeries(batches, (batch) => {
		const eqQuery = `eq.${method}`;
		const inQuery = "in.(" + _.join(batch, ",") + ")";
		return axios({
			method: "PATCH",
			url: endpoint,
			headers: {
				authorization: `Bearer ${process.env.POSTGREST_TOKEN}`
			},
			params: {
				submission_method: eqQuery,
				iid: inQuery
			},
			data: {
				recycle_bin: bin
			}
		});
	}, 2);
};

module.exports = {
	addLevel,
	getIidDiffs,
	recycleBin,
	addGroups
};
