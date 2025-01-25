"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeTraits = void 0;
const json_1 = require("@stoplight/json");
function mergeTraits(data) {
    if (Array.isArray(data.traits)) {
        data = Object.assign({}, data); // shallow copy
        for (const trait of data.traits) {
            for (const key in trait) {
                data[key] = merge(data[key], trait[key]);
            }
        }
    }
    return data;
}
exports.mergeTraits = mergeTraits;
function merge(origin, patch) {
    // If the patch is not an object, it replaces the origin.
    if (!(0, json_1.isPlainObject)(patch)) {
        return patch;
    }
    const result = !(0, json_1.isPlainObject)(origin)
        ? {} // Non objects are being replaced.
        : Object.assign({}, origin); // Make sure we never modify the origin.
    Object.keys(patch).forEach(key => {
        const patchVal = patch[key];
        if (patchVal === null) {
            delete result[key];
        }
        else {
            result[key] = merge(result[key], patchVal);
        }
    });
    return result;
}
