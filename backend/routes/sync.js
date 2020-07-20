const express = require("express");
const router = express.Router();

const _ = require("lodash");

const levels = require("../lib/levels.js");
const sync = require("../lib/search/search.js");

router.post("/", async (req, res, next) => {
    const {knex} = req;
    const order = "sha256";

    // get ALL the levels
    const allLevels = await levels.getAllLevels({knex});

    // which attributes actually need to go to meili too?
    const attributesToSend = [
        "sha256", "tags", "authors", "group", "song",
        "artist", "description"
    ];

    const readyToSend = _.map(allLevels, (level) => _.pick(level, attributesToSend));

    // drop that bad boy in meili
    const configResult = await sync.updateConfig();
    const uploadResult = await sync.updateIndexes(readyToSend);

    return res.status(200).json([configResult, uploadResult]);
    
})

module.exports = router;
