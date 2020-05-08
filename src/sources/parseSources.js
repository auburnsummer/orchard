const _ = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

const parse = async (fileName) => {
    let text = await Promise.promisify(fs.readFile)(fileName, 'utf8');
    const lines = _.split(text, "\n");

    return _.filter(_.map(lines, (line) => {
        // comment or empty line.
        if (line[0] === "#" || line[0] === " ") {
            return false;
        }

        const tokens = _.split(line, "::");
        const driver = _.head(tokens).trim();
        
        // rejoin (if there's :: in the body, for instance), then add the implicit braces
        const argString = "{" + _.join(_.tail(tokens), "::") + "}";

        return {
            driver: driver,
            args: JSON.parse(argString)
        }
    }),
    (o) => o.driver
    );
}

module.exports = {
    parse: parse
}