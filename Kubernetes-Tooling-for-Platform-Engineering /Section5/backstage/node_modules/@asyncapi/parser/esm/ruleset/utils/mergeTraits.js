import { isPlainObject } from '@stoplight/json';
export function mergeTraits(data) {
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
function merge(origin, patch) {
    // If the patch is not an object, it replaces the origin.
    if (!isPlainObject(patch)) {
        return patch;
    }
    const result = !isPlainObject(origin)
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
