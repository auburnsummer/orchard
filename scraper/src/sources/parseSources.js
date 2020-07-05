const YAML = require('js-yaml');

// todo: verify with a schema
const parse = async (fileName) => {
	const text = await Promise.promisify(fs.readFile)(fileName, "utf8");
	return YAML.parse(text);
};

module.exports = {
	parse
};
