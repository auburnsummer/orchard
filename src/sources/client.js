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
 * @param driverData driver-specific data which just gets dumped in the submission_info field.
 */
const levelCommands = (data, downloadURL, submissionMethod, iid, driverData) => {
    // level. direct from data except the "tags" and "authors".
    const levelCommand = {
        endpoint: 'level',
        data: _.pick(data, _.difference(_.keys(data), ["tags", "authors", "rdzip_ipfs"]))
    };

    // aux data
    const auxCommand = {
        endpoint: 'aux_data',
        data: {
            sha256: data.sha256,
            submission_method: submissionMethod,
            iid: iid,
            download_url: downloadURL,
            submission_info: JSON.stringify(driverData),
        }
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

    return _.flatten([
        levelCommand,
        tagCommands,
        authorCommands,
        auxCommand
    ])
}

/**
 * Upload a list of POST requests to the server.
 * 
 * @param {*} commands 
 */
const runPostRequests = async (commands) => {
    // TODO: do this with RPC instead!
    // for (let command of commands) {
    //     let resp = await axios({
    //         method: 'post',
    //         url: `${process.env.POSTGREST_SERVER}/${command.endpoint}`,
    //         headers: {
    //             authorization: `Bearer ${process.env.BEARER_TOKEN}`
    //         },
    //         data: command.data
    //     });
    // }
}

module.exports = {
    levelCommands : levelCommands,
    runPostRequests : runPostRequests
}