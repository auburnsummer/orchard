/**
 * Stores all of the inputs and releases them all at once.
 */

const _ = require('lodash');

var inputs = [];

function capacitor(source) {
    const callback = this.async();
    // read length into a temp variable
    let currentCount = inputs.length;
    inputs.push(source);

    setTimeout(() => {
        // did someone else add anything while we were waiting?
        // if so, we're not the last one.
        if (inputs.length > currentCount + 1) {
            callback(null, "");
        } else {
            callback(null, inputs.join("\n"));
        }
    }, 5000);
}

module.exports = capacitor;