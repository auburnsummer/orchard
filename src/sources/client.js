const _ = require('lodash');
const axios = require('axios');

/**
 * Add a level to the database.
 * 
 * @param data The data to be sent (typically directly from vitals);
 * @param downloadURL The download URL for the level. This is either of the form ipfs://<ipfs hash> or http[s]://<path to rdzip>.
 *                    It's always a direct link.
 * @param submissionMethod A string of the submission method. This needs to be unique.
 * @param iid The driver-specific individual id
 * @param driverData driver-specific data which just gets dumped in the submission_info field.
 */
const addLevel = (data, downloadURL, submissionMethod, iid, driverData) => {
    // level. direct from data except the "tags" and "authors".
    const level = _.pick(data, _.difference(_.keys(data), ["tags", "authors", "rdzip_ipfs"]))

    // aux data
    const aux = {
        sha256: data.sha256,
        submission_method: submissionMethod,
        iid: iid,
        download_url: downloadURL,
        submission_info: JSON.stringify(driverData)
    }

    const dataToSend = {
        level: level,
        aux: aux,
        tags: data.tags,
        authors: data.authors
    };

    const endpoint = `${process.env.POSTGREST_SERVER}/rpc/add_level`;

    return axios({
        method: 'POST',
        url: endpoint,
        data: dataToSend,
        headers: {
            authorization: `Bearer ${process.env.BEARER_TOKEN}`,
            prefer: `params=single-object`,
            "content-type" : "application/json"
        }
    });
}


module.exports = {
    addLevel : addLevel,
}