const _ = require('lodash');


/**
 * Run promises in series, only allowing a certain number of promises to be executing at
 * any given time.
 * 
 * @param {*} arr : An array of something.
 * @param {*} func : A function which returns a Promise.
 * @param {*} throttle: How many functions allowed at once.
 * @returns The resolved values of each of the Promises obtained by running func() on each item in arr.
 */
const mapSeries = async (arr, func, throttle=1) => {
    const chunks = _.chunk(arr, throttle);
    return _.reduce(chunks, async (prev, curr) => {
        const soFar = await prev;
        const next = await Promise.all(_.map(curr, c => func(c)));
        return _.concat(soFar, next);
    }, Promise.resolve([]));
}


module.exports = {
    mapSeries: mapSeries
}