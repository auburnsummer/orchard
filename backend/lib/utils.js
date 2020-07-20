const _ = require('lodash');

/**
 * Given an object, return a new object with the specified keys removed.
 */
const removeKeys = (obj, keys) => _.pick(obj, _.difference(_.keys(obj), keys));


module.exports = {
    removeKeys
}