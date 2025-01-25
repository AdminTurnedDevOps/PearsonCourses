export function getMissingProps(arr = [], obj = {}) {
    if (!Object.keys(obj).length)
        return arr;
    return arr.filter(val => {
        return !Object.prototype.hasOwnProperty.call(obj, val);
    });
}
