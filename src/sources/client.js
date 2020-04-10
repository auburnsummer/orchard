const _ = require('lodash');
const axios = require('axios');


/**
 * Generate commands to add a level.
 * 
 * @param {} commands 
 */
const levelCommands = (data, downloadURL, submissionMethod, iid) => {
    // level
    const levelCommand = {
        endpoint: 'level',
        data: {
            sha256: data.sha256,
            artist: data.artist,
            song: data.song,
            difficulty: data.difficulty,
            seizure_warning: data.seizureWarning,
            description: data.description,
            max_bpm: data.maxBPM,
            min_bpm: data.minBPM,
            last_updated: data.lastUpdated,
            single_player: data.singlePlayer,
            two_player: data.twoPlayer,
            image_url: data.imageURL,
            icon_url: data.icon,
            download_url: downloadURL
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
    const authorCommands = _.map(data.author, (author, idx) => {
        return {
            endpoint: 'level_author',
            data: {
                sha256: data.sha256,
                tag: tag,
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
            iid: iid
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
 * Turns a list of commands into batched set of commands based on common endpoints. Commands are just objects with these keys:
 * 
 *  - endpoint: the endpoint being sent to
 *  - data: the data being sent
 * 
 * @param {} commands 
 */
const consolidate = (commands) => {
    // we have to create a level first before tags, etc.
    const order = ["level", "aux_data", "level_tag", "level_author", "booster"];

    // Get to a form { [endpoint] : [list of commands] }
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
 *  - endpoint: the endpoint we're sending to
 *  - data: the data we're sending
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
            data: batch.data
        });
    }
}

module.exports = {
    levelCommands : levelCommands,
    consolidate : consolidate,
    runPostRequests : runPostRequests
}