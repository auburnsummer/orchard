const _ = require("lodash");
const axios = require("axios");
const log = require("../utils/log");

const promiseUtils = require("../utils/promises");

/**
 * Add a level to the database.
 *
 * @param data The data to be sent (typically directly from vitals);
 * @param downloadURL The download URL for the level. This is either of the form ipfs://<ipfs hash> or http[s]://<path to rdzip>.
 *                    It's always a direct link.
 * @param submissionMethod A string of the submission method. This needs to be unique.
 * @param iid The driver-specific individual id
 * @param humanName Human name of the driver ("group") for display purposes.
 * @param driverData driver-specific data which just gets dumped in the submission_info field.
 */
const addLevel = (data, downloadURL, submissionMethod, iid, humanName, driverData) => {
	// level. direct from data except the "tags" and "authors", then add some
	// of the other things as well

	const levelPartial = _.pick(data, _.difference(_.keys(data), ["tags", "authors"]));

	const level = _.merge(
		levelPartial,
		{
			submission_method: submissionMethod,
			human_name: humanName,
			submission_iid: iid,
			download_url: downloadURL,
			submission_info: JSON.stringify(driverData)
		}
	);

	// aux data
	const aux = {
		sha256: data.sha256
	};

	const dataToSend = {
		level: level,
		aux: aux,
		tags: data.tags,
		authors: data.authors
	};
	log("JSON", JSON.stringify(dataToSend));

	const endpoint = `${process.env.POSTGREST_SERVER}/rpc/add_level`;

	return axios({
		method: "POST",
		url: endpoint,
		data: dataToSend,
		headers: {
			authorization: `Bearer ${process.env.POSTGREST_TOKEN}`,
			prefer: "params=single-object",
			"content-type" : "application/json"
		}
	});
};

const getIidDiffs = (method, iids) => {
	const endpoint = `${process.env.POSTGREST_SERVER}/rpc/get_iid_diffs`;

	return axios({
		method: "POST",
		url: endpoint,
		data: {
			method: method,
			iids: iids
		},
		headers: {
			authorization: `Bearer ${process.env.POSTGREST_TOKEN}`
		}
	})
		.then( (resp) => {
			return resp.data;
		});
};

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
	recycleBin
};
