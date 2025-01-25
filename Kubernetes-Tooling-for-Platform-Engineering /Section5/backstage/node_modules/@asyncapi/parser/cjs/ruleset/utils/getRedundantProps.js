"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedundantProps = void 0;
function getRedundantProps(arr = [], obj = {}) {
    if (!arr.length)
        return Object.keys(obj);
    return Object.keys(obj).filter(val => {
        return !arr.includes(val);
    });
}
exports.getRedundantProps = getRedundantProps;
