"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestJsonPath = exports.safePointerToPath = exports.getEndRef = exports.traverseObjUntilRef = exports.isAbsoluteRef = exports.startsWithProtocol = void 0;
const json_1 = require("@stoplight/json");
const path_1 = require("@stoplight/path");
const lodash_1 = require("lodash");
const PROTOCOL_REGEX = /^[a-z]+:\/\//i;
const startsWithProtocol = (input) => PROTOCOL_REGEX.test(input);
exports.startsWithProtocol = startsWithProtocol;
const isAbsoluteRef = (ref) => (0, path_1.isAbsolute)(ref) || (0, exports.startsWithProtocol)(ref);
exports.isAbsoluteRef = isAbsoluteRef;
const traverseObjUntilRef = (obj, path) => {
    let piece = obj;
    for (const segment of path.slice()) {
        if (!(0, lodash_1.isObject)(piece)) {
            throw new TypeError('Segment is not a part of the object');
        }
        if (segment in piece) {
            piece = piece[segment];
        }
        else if ((0, json_1.hasRef)(piece)) {
            return piece.$ref;
        }
        else {
            throw new Error('Segment is not a part of the object');
        }
        path.shift();
    }
    if ((0, json_1.isPlainObject)(piece) && (0, json_1.hasRef)(piece) && Object.keys(piece).length === 1) {
        return piece.$ref;
    }
    return null;
};
exports.traverseObjUntilRef = traverseObjUntilRef;
const getEndRef = (refMap, $ref) => {
    while ($ref in refMap) {
        $ref = refMap[$ref];
    }
    return $ref;
};
exports.getEndRef = getEndRef;
const safePointerToPath = (pointer) => {
    const rawPointer = (0, json_1.extractPointerFromRef)(pointer);
    return rawPointer !== null ? (0, json_1.pointerToPath)(rawPointer) : [];
};
exports.safePointerToPath = safePointerToPath;
const getClosestJsonPath = (data, path) => {
    const closestPath = [];
    if (!(0, lodash_1.isObject)(data))
        return closestPath;
    let piece = data;
    for (const segment of path) {
        if (!(0, lodash_1.isObject)(piece) || !(segment in piece))
            break;
        closestPath.push(segment);
        piece = piece[segment];
    }
    return closestPath;
};
exports.getClosestJsonPath = getClosestJsonPath;
//# sourceMappingURL=refs.js.map