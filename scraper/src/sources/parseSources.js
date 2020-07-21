const YAML = require("js-yaml");
const fs = require("fs");
const fsp = fs.promises;

// todo: verify with a schema
const parse = async (fileName) => {
	const text = await fsp.readFile(fileName, "utf8");
	return YAML.safeLoad(text);
};

module.exports = {
	parse
};
