"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printValue = void 0;
const lodash_1 = require("lodash");
const json_1 = require("@stoplight/json");
function printValue(value) {
    if (value === void 0) {
        return 'undefined';
    }
    if ((0, lodash_1.isObject)(value)) {
        if (Array.isArray(value)) {
            return 'Array[]';
        }
        if (value instanceof RegExp) {
            return String(value.source);
        }
        if (!(0, json_1.isPlainObject)(value) && 'constructor' in value && typeof value.constructor.name === 'string') {
            return value.constructor.name;
        }
        return 'Object{}';
    }
    return JSON.stringify(value);
}
exports.printValue = printValue;
//# sourceMappingURL=printValue.js.map