/**
 * Decorate an event handler to not propagate up.
 */

const trap = (func) => (evt) => {
    evt.stopPropagation();
    func(evt);
}

module.exports = {
    trap
}