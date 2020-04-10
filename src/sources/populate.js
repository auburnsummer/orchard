const _ = require('lodash');
const vitals = require('@auburnsummer/vitals');
const axios = require('axios');


const upload = async (data, download_URL, submissionMethod, iid) => {
    return Promise.all([
        axios({
            method: 'post',
            url: `${process.env.POSTGREST_SERVER}/level`,
            headers: {
                Authorization : `Bearer ${process.env.BEARER_TOKEN}`
            },
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
                download_url: download_URL
            }
        })
    ])
}

/*

*/
const runDriver = async (driverName, args) => {
    const Driver = require(`./drivers/${driverName}.js`);

    const driver = new Driver(args);

    // get all the names...
    await driver.init();
    const iids = await driver.getIids();
    
    const data = await Promise.all(_.map(iids, async (iid) => {
        const rdzip = await driver.get(iid);
        return vitals.analyse(rdzip, false);
    }));

    return data;

    const uploads = await Promise.all(_.map(data, async (datum) => {

    }));
}












module.exports = {
    runDriver: runDriver
}