const _ = require('lodash');
const axios = require('axios');


/**
 * Generate a list of commands which add a level. What's a command? A command is an object with
 * these keys:
 * 
 *  - endpoint: the postgREST endpoint we want to hit
 *  - data: the data to post to that endpoint.
 * 
 * Why does it generate a list of commands? Because even one level will have data in multiple tables:
 *  - the "level" table stores directly data from vitals;
 *  - the "aux_data" table stores data about the submission method;
 *  - the "level_tag" and "level_author" are tables to store tags and authors
 * 
 * @param data The data to be sent (typically directly from vitals);
 * @param downloadURL The download URL for the level. This is either of the form ipfs://<ipfs hash> or http[s]://<path to rdzip>.
 *                    It's always a direct link.
 * @param submissionMethod A string of the submission method. This needs to be unique.
 * @param iid The driver-specific individual id
 */
const levelCommands = (data, downloadURL, submissionMethod, iid) => {
    // level. direct from data except the "tags" and "authors".
    const levelCommand = {
        endpoint: 'level',
        data: _.pick(data, _.difference(_.keys(data), ["tags", "authors", "rdzip_ipfs"]))
    };
    // tags
    const tagCommands = _.map(data.tags, (tag, idx) => {
        return {
            endpoint: 'level_tag',
            data: {
                sha256: data.sha256,
                tag: tag,
                seq: idx
            }
        };
    });
    // authors
    const authorCommands = _.map(data.authors, (author, idx) => {
        return {
            endpoint: 'level_author',
            data: {
                sha256: data.sha256,
                author: author,
                seq: idx
            }
        };
    });
    // aux data
    const auxCommand = {
        endpoint: 'aux_data',
        data: {
            sha256: data.sha256,
            submission_method: submissionMethod,
            iid: iid,
            download_url: downloadURL
        }
    }

    return _.flatten([
        levelCommand,
        tagCommands,
        authorCommands,
        auxCommand
    ])
}

/**
 * postgREST allows you to send a list of commands under one endpoint for efficiency.
 * 
 * This function batches up commands based on common endpoints.
 * In addition, it sorts the commands in a specific order to satisfy foreign key constraints.
 * 
 * @param {} commands - list of commands
 */
const consolidate = (commands) => {
    // we have to create a level first before tags, etc due to foreign key constraints.
    const order = ["level", "aux_data", "level_tag", "level_author", "booster"];

    // Get to the form { [endpoint] : [list of commands] }
    const unsortedMap = _.reduce(commands, (prev, curr) => {
        if (!_.includes(_.keys(prev), curr.endpoint)) {
            prev[curr.endpoint] = [];
        }
        prev[curr.endpoint].push(curr.data);
        return prev;
    }, {});

    // Get to a form [ {endpoint: text, data: [...]}, {endpoint: text, data: [...]} ]
    return _.filter(
        _.map(order, (o) => {
            return {endpoint: o, data: unsortedMap[o]};
        }),
        ({endpoint, data}) => !_.isUndefined(data)
    );
}

/**
 * Upload a batch of POST requests to the postgREST server. Commands are just objects with these keys:
 * 
 * @param {*} commands 
 */
const runPostRequests = async (commands) => {
    // turn the command list into a map of endpoint -> list of data
    const batched = consolidate(commands);

    for (let batch of batched) {
        let resp = await axios({
            method: 'post',
            url: `${process.env.POSTGREST_SERVER}/${batch.endpoint}`,
            headers: {
                authorization: `Bearer ${process.env.BEARER_TOKEN}`
            },
            data: batch.data
        });
    }
}

module.exports = {
    levelCommands : levelCommands,
    consolidate : consolidate,
    runPostRequests : runPostRequests
}