import qs from "querystringify";

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
 * Convenience method for decorating an event handler to not propagate AND only occur on left click.
 */
export const ltrap = (func) => trap(leftClick(func));

/**
 * Return a function that returns a constant.
 */
export const constant = x => () => x;

/**
 * Lodash cond as a very scary one-liner
 */
export const cond = list => (...args) => list.find(t => t[0](...args))[1](...args);

/**
 * Lodash stubTrue & stubFalse
 */
export const stubTrue = () => true;

export const stubFalse = () => false;

/**
 * Lodash sample
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * is null or undefined
 */
export const nullOrUndef = x => x === undefined || x === null;

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
 * Lodash pick.
 */
export const pick = (obj, keys) => {
    return keys.reduce( (prev, curr) => {
        prev[curr] = obj[curr];
        return prev;
    }, {});
}

/**
 * Generates url paths
 * defaults is a dict of the default values for a query param. if it's default,
 * then it's omitted.
 */
export const paramsLink = (link, params, defaults = {}) => {
    const keys = Object.keys(params).filter( p => defaults[p] !== params[p]);
    const obj = pick(params, keys);
    const fullLink = link + qs.stringify(obj, true);
    return fullLink;
}

export const blobToBase64URL = (blob) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(blob);
        fr.onloadend = () => {
            const base64result = fr.result;
            resolve(base64result);
        };
        fr.onerror = (err) => {
            reject(err);
        }
    })
}