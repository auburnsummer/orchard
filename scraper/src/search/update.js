/* update the meilisearch index.*/

require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});

const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');

( async () => {
    const levelResponse = await axios({
        method: 'GET',
        url: `${process.env.POSTGREST_SERVER}/level`,
        params: {
            select: _.join([
                "sha256",
                "artist",
                "song",
                "difficulty",
                "seizure_warning",
                "description",
                "max_bpm",
                "min_bpm",
                "last_updated",
                "single_player",
                "two_player",
                "has_classics",
                "has_oneshots",
                "has_squareshots",
                "has_swing",
                "has_freetimes",
                "has_holds",
                "level_tag(tag,seq)",
                "level_author(author,seq)",
                "aux(submission_method,approval,recycle_bin)"
            ], ","),
        },
        headers: {
            authorization: `Bearer ${process.env.POSTGREST_TOKEN}`
        }
    });
    // console.log(levelResponse.data);
    const normalised = _.map(levelResponse.data, (level) => {
        const thingsWeChanged = [
            "last_updated", //timestamp instead of ISO
            "level_tag", // direct array
            "level_author", // direct array
            "aux" // destructure
        ];

        // things we don't need to touch.
        const direct = _.pick(level, _.difference(_.keys(level), thingsWeChanged));

        const last_updated = moment(level.last_updated).unix();

        const tags = _.map(_.sortBy(level.level_tag, (tag) => tag.seq), (tag) => tag.tag);
        const authors = _.map(_.sortBy(level.level_author, (a) => a.seq), (a) => a.author);
        
        return {
            last_updated,
            tags,
            authors,
            ...direct,
            ...level.aux[0]
        }
    })
    // yeet it into meilisearch
    const meiliResp = await axios({
        method: "POST",
        url: `${process.env.MEILISEARCH_SERVER}/indexes/levels/documents`,
        data: normalised
    });
    console.log(meiliResp.data);
    const uid = meiliResp.data.updateId;
    while (true) {
        const howIsItGoing = await axios({
            method: "GET",
            url: `${process.env.MEILISEARCH_SERVER}/indexes/levels/updates/${uid}`
        });
        if (howIsItGoing.data.status === "processed") {
            console.log("upload complete!");
            break;
        } else {
            console.log(howIsItGoing.data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
})();