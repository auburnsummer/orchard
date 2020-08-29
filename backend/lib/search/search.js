const axios = require("axios");
const _ = require("lodash");

const INDEX_NAME = "levels";

// is the index created yet?
const isIndexCreated = () => {
	return axios(process.env.ELASTICSEARCH_SERVER + "/levels")
	.then(_.stubTrue)
	.catch(_.stubFalse)
}

const makeIndex = () => {
	return axios.put(
		process.env.ELASTICSEARCH_SERVER + "/levels",
		require("./indexSettings.json")
	)
	.then(res => {
		return axios.put(
			process.env.ELASTICSEARCH_SERVER + "/levels" + "/_mapping",
			require('./mapping.json')
		);
	})
	.then(res => res.data);
}

const updateIndexes = (levels) => {
	// attributes that elasticsearch needs
	const attributesToSend = [
		"approval", "artist", "authors",
		"song", "description", "difficulty",
		"group_id", "has_classics", "has_freetimes",
		"has_holds", "has_oneshots", "has_squareshots",
		"has_swing", "last_updated", "max_bpm",
		"min_bpm", "recycle_bin", "seizure_warning",
		"single_player", "two_player", "uploaded", "tags"
	];

	const payload = _.flatten(levels.map( (level) => {
		return _.map([
			{index: {_id: level.id}},
			_.pick(level, attributesToSend)
		], JSON.stringify);
	})).join("\n") + "\n"; // leading newline after req'd

	return axios.post(
		process.env.ELASTICSEARCH_SERVER + "/levels" + "/_bulk",
		payload,
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	).then(res => res.data);
}

const doSearch = (query, showUnapproved = false, size = 15, offset = 0) => {
	return axios.post(
		process.env.ELASTICSEARCH_SERVER + "/levels" + "/_search",
		{
			size,
			from: offset,
			query: {
				bool: {
					filter: [
						{ term: {recycle_bin: false} },
						...!showUnapproved ? [{ range: {approval: {gte: 10} } }] : []
					],
					must: {
						simple_query_string: {
							query,
							fields: ["artist^6", "song^8", "description4", "tags^5", "authors^5"]
						}
					}
				}
			}
		}
	)
	.then( res => res.data.hits )
	.catch(console.log)
}

module.exports = {
	isIndexCreated,
	makeIndex,
	updateIndexes,
	doSearch
}