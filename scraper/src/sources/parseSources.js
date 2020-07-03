const _ = require("lodash");
const fs = require("fs");
const Promise = require("bluebird");

/*
(\w+) 		// match the driver part
 ?    		// optional space before the human name
\[(.+)\]	// match the human name
 ?			// optional space again
::			// indicates start of the JSONish section
(.+)		// match the rest of the line
*/
const regex = /(\w+) ?\[(.+)\] ?::(.+)/;

const parse = async (fileName) => {
	const text = await Promise.promisify(fs.readFile)(fileName, "utf8");
	const lines = _.split(text, "\n");

	return _.filter(_.map(lines, (line) => {
		// comment or empty line.
		if (line[0] === "#" || line[0] === " " || line === "") {
			return false;
		}

		const re = new RegExp(regex);
		const result = re.exec(line);
		console.log(line);
		console.log(result);
		const [, driver, humanName, argString] = result;

		// add the implicit braces
		const jsonString = "{" + argString + "}";

		return {
			driver,
			humanName,
			args: JSON.parse(jsonString)
		};
	}),
	// filter on driver existing and not being an empty string
	(o) => o.driver
	);
};

module.exports = {
	parse
};
