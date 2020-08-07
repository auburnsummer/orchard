

import {_, it, lift as L} from "param.macro";

/**
 * Decorate an event handler to not propagate up.
 */
export const trap = (func) => (evt) => {
    evt.stopPropagation();
    func(evt);
}

/**
 * Return a function that returns a constant.
 */
export const constant = () => _;

/**
 * Lodash cond as a very scary one-liner
 */
export const cond = (...args) => _.find(it[0](...args))[1](...args)

/**
 * Lodash stubTrue
 */
export const stubTrue = () => true;

/**
 * Lodash sample
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];