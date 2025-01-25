"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEquality = exports.shallowEquality = void 0;
const atlassian_openapi_1 = require("atlassian-openapi");
const lodash_1 = __importDefault(require("lodash"));
const ts_is_present_1 = require("ts-is-present");
function referenceCount(walker, component) {
    let count = 0;
    walker(component, ref => { count++; return ref; });
    return count;
}
function shallowEquality(referenceWalker) {
    return (x, y) => {
        if (!lodash_1.default.isEqual(x, y)) {
            return false;
        }
        if (atlassian_openapi_1.SwaggerTypeChecks.isReference(x)) {
            return false;
        }
        return referenceCount(referenceWalker, x) === 0;
    };
}
exports.shallowEquality = shallowEquality;
function isSchemaOrThrowError(ref, s) {
    if (s === undefined) {
        throw new Error(`Could not resolve reference: ${ref.$ref}`);
    }
    return s;
}
function arraysEquivalent(leftOriginal, rightOriginal) {
    if (leftOriginal.length !== rightOriginal.length) {
        return false;
    }
    const left = [...leftOriginal].sort();
    const right = [...rightOriginal].sort();
    for (let index = 0; index < left.length; index++) {
        if (left[index] !== right[index]) {
            return false;
        }
    }
    return true;
}
class ReferenceRecord {
    constructor() {
        this.leftRightSeen = {};
    }
    checkAndStore(left, right) {
        if (this.leftRightSeen[left.$ref] === undefined) {
            this.leftRightSeen[left.$ref] = {};
        }
        const leftLookup = this.leftRightSeen[left.$ref];
        const result = leftLookup[right.$ref] === true ? 'seen-before' : 'new';
        leftLookup[right.$ref] = true;
        return result;
    }
}
function deepEquality(xLookup, yLookup) {
    const refRecord = new ReferenceRecord();
    function compare(x, y) {
        // If both are references then look up the references and compare them for equality
        if (ts_is_present_1.isPresent(x) && ts_is_present_1.isPresent(y)) {
            if (atlassian_openapi_1.SwaggerTypeChecks.isReference(x) && atlassian_openapi_1.SwaggerTypeChecks.isReference(y)) {
                if (refRecord.checkAndStore(x, y) === 'seen-before') {
                    return true;
                }
                const xResult = isSchemaOrThrowError(x, xLookup.getSchema(x));
                const yResult = isSchemaOrThrowError(y, yLookup.getSchema(y));
                return compare(xResult, yResult);
            }
            else if (atlassian_openapi_1.SwaggerTypeChecks.isReference(x) || atlassian_openapi_1.SwaggerTypeChecks.isReference(y)) {
                return false;
            }
            else if (typeof x === 'object' && typeof y === 'object') {
                // If both are objects then they should have all of the same keys and the values of those keys should match
                if (!arraysEquivalent(Object.keys(x), Object.keys(y))) {
                    return false;
                }
                const xKeys = Object.keys(x);
                return xKeys.every(key => compare(x[key], y[key]));
            }
        }
        // If they are not objects or references then you can just run a direct equality
        return lodash_1.default.isEqual(x, y);
    }
    return compare;
}
exports.deepEquality = deepEquality;
