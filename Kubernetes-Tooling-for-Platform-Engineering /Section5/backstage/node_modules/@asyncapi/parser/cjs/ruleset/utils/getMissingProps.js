"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissingProps = void 0;
function getMissingProps(arr = [], obj = {}) {
    if (!Object.keys(obj).length)
        return arr;
    return arr.filter(val => {
        return !Object.prototype.hasOwnProperty.call(obj, val);
    });
}
exports.getMissingProps = getMissingProps;
