/**
 * A middleware that checks the schema of stuff coming in according to JSON schema.
 *
 */

const _ = require('lodash');
const Ajv = require('ajv');

const ajv = new Ajv();
const not = x => !x;

module.exports = (obj) => (req, res, next) => {
	const results = _.map(_.keys(obj), (key) => {
		const schema = obj[key];
		return ajv.validate(schema, req[key]);
	});

	if (_.some(results, not)) {
		return res.status(400).json({
			error: true,
			message: `Bad request: ${ajv.errorsText()}`,
		});
	} else {
		next();
	}
};
