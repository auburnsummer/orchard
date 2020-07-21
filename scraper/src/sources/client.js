const _ = require("lodash");
const axios = require("axios");
const log = require("../utils/log");

const promiseUtils = require("../utils/promises");
const FormData = require('form-data');

const serverUp = () => {
	return axios({
		method: 'GET',
		url: `${process.env.SERVER}/levels`
	})
	.then( (data) => {
		return true;
	})
	.catch( (err) => {
		return false;
	})
}

const getIidDiffs = (group_id, proposed_iids) => {
	return axios({
		method: 'POST',
		url: `${process.env.SERVER}/levels/diff`,
		headers: {
			Authorization: `Bearer ${process.env.SERVER_API_KEY}`
		},
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
		headers: {
			Authorization: `Bearer ${process.env.SERVER_API_KEY}`
		},
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
		headers: {
			...formHeaders,
			Authorization: `Bearer ${process.env.SERVER_API_KEY}`
		},
		maxContentLength: Infinity,
		maxBodyLength: Infinity,
	});

}

const sync = () => {
	return axios({
		method: 'POST',
		url: `${process.env.SERVER}/sync`,
		headers: {
			Authorization: `Bearer ${process.env.SERVER_API_KEY}`
		}
	});
}

module.exports = {
	addLevel,
	serverUp,
	getIidDiffs,
	addGroups,
	sync
};
