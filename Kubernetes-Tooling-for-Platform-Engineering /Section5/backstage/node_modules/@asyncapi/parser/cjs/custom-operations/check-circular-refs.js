"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCircularRefs = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
function checkCircularRefs(document) {
    if (hasInlineRef(document.json())) {
        (0, utils_1.setExtension)(constants_1.xParserCircular, true, document);
    }
}
exports.checkCircularRefs = checkCircularRefs;
function hasInlineRef(data) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (Object.prototype.hasOwnProperty.call(data, '$ref')) {
            return true;
        }
        for (const p in data) {
            if (hasInlineRef(data[p])) {
                return true;
            }
        }
    }
    return false;
}
