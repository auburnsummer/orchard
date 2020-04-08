/*
Create some mock data for the tables for testing purposes.

Not secure.
*/

const axios = require('axios').default;
const _ = require('lodash');
const sha256 = require('js-sha256').sha256;
const vitals = require('@auburnsummer/vitals');


const RD_API_URL = "https://script.google.com/macros/s/AKfycbzm3I9ENulE7uOmze53cyDuj7Igi7fmGiQ6w045fCRxs_sK3D4/exec";

( async () => {

    let data = await axios(RD_API_URL);

    let difficultyFix = (diff) => {
        if (diff === 'VeryTough') {
            return 'Very Tough';
        }
        return diff;
    }

    let escape = (s) => {
        return s.split("'").join("''");
    }

    let make_value_row = (datum, index) => {
        return `
            ('${sha256(index.toString())}', '${escape(datum.artist)}', '${escape(datum.song)}', '${difficultyFix(datum.difficulty)}', '${datum.seizure_warning}', ${datum.single_player}, ${datum.two_player})
        `
    }

    let make_tag_rows = (datum, index) => {
        return _.reverse(_.map(_.uniq(datum.tags), (tag, idx) => {
            return `
                ('${sha256(index.toString())}', '${escape(tag)}', '${idx}')
            `
        }))
    }

    let make_author_rows = (datum, index) => {
        return _.reverse(_.map(_.uniq(_.split(datum.author, ",")), (author, idx) => {
            return `
                ('${sha256(index.toString())}', '${escape(author)}', '${idx}')
            `
        }))
    }

    console.log(`
     -- automatically generated.
     -- used for testing postgrest queries.
     -- don't expect this to be an up to date seeding of the actual data.
    `)

    console.log(`
        INSERT INTO orchard.level (sha256, artist, song, difficulty, seizure_warning, single_player, two_player) VALUES
        ${_.join(_.map(data.data, make_value_row), ",\n")}
    ;`)

    console.log(`
        INSERT into orchard.level_tag (sha256, tag, seq) VALUES
        ${_.join(_.flatten(_.map(data.data, make_tag_rows)), ",\n")}
    ;`)

    console.log(`
        INSERT into orchard.level_author (sha256, author, seq) VALUES
        ${_.join(_.flatten(_.map(data.data, make_author_rows)), ",\n")}
    ;`)
})();