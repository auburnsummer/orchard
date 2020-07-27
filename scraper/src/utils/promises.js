const _ = require("lodash");


/**
 * Run promises in series, only allowing a certain number of promises to be executing at
 * any given time.
 *
 * @param {*} arr : An array of something.
 * @param {*} func : A function which returns a Promise.
 * @param {*} throttle: How many functions allowed at once.
 * @returns Promise of the resolved values of each of the Promises obtained by running func() on each item in arr.
 */
const mapSeries = async (arr, func, throttle=1) => {
	const chunks = _.chunk(arr, throttle);
	return _.reduce(chunks, async (prev, curr, chunkIndex) => {
		const soFar = await prev;
		// index is: chunk index multiplied by chunk size + inner index
		const next = await Promise.all(_.map(curr, (c, idx) => func(c, chunkIndex * throttle + idx, arr)));
		return _.concat(soFar, next);
	}, Promise.resolve([]));
};

/**
 * Try a promise a few times if it fails.
 * @param {*} func  - a function which returns a promise.
 * @param {*} retries - number of times to try
 * @param {*} waitTime - time in seconds to wait between attempts
 * @param {*} err
 */
const retry = async (func, retries=3, waitTime=10, err=null) => {
	if (retries < 0) {
		return Promise.reject(err);
	}
	return func()
		.catch( async (err) => {
			await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
			return retry(func, retries - 1, waitTime, err);
		});
};


module.exports = {
	mapSeries: mapSeries,
	retry: retry
};
