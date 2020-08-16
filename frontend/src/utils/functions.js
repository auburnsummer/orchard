/**
 * Decorate an event handler to not propagate up.
 */
export const trap = (func) => (evt) => {
    evt.stopPropagation();
    func(evt);
}

/*
 * Decorate an event handler to only occur on left click.
 */
export const leftClick = (func) => (evt) => {
    if (evt.button === 0) {
        func();
    }
}

/**
 * Return a function that returns a constant.
 */
export const constant = x => () => x;

/**
 * Lodash cond as a very scary one-liner
 */
export const cond = list => (...args) => list.find(t => t[0](...args))[1](...args);

/**
 * Lodash stubTrue
 */
export const stubTrue = () => true;

export const stubFalse = () => false;

/**
 * Lodash sample
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * Is a link a URL?
 */
export const isHttpUrl = s => s?.startsWith?.("http://") || s?.startsWith?.("https://") || false;

/**
 * Return a function which returns true if the argument is equal to the argument of the first call.
 */
export const eq = a => b => a === b;

/**
 * Return a function which returns true if the argument is greater than or equal to the argument of the first.
 */
export const geq = a => b => b >= a;

/**
 * Generates url paths
 * defaults is a dict of the default values for a query param. if it's default,
 * then it's omitted.
 */
export const paramsLink = (link, params, defaults) => {
    const keys = Object.keys(params).filter( p => defaults[p] !== params[p]);
    const obj = keys.reduce( (prev, curr) => {
        prev[curr] = params[curr];
        return prev;
    }, {});
    const string = new URLSearchParams(obj).toString();
    return link + (string ? "?" + string : "");

}