"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringifiedDocument = exports.isParsedDocument = exports.isOldAsyncAPIDocument = exports.isAsyncAPIDocument = exports.toAsyncAPIDocument = exports.createAsyncAPIDocument = void 0;
const models_1 = require("./models");
const stringify_1 = require("./stringify");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
function createAsyncAPIDocument(asyncapi) {
    switch (asyncapi.semver.major) {
        case 2:
            return new models_1.AsyncAPIDocumentV2(asyncapi.parsed, { asyncapi, pointer: '/' });
        case 3:
            return new models_1.AsyncAPIDocumentV3(asyncapi.parsed, { asyncapi, pointer: '/' });
        default:
            throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
    }
}
exports.createAsyncAPIDocument = createAsyncAPIDocument;
function toAsyncAPIDocument(maybeDoc) {
    if (isAsyncAPIDocument(maybeDoc)) {
        return maybeDoc;
    }
    if (!isParsedDocument(maybeDoc)) {
        return (0, stringify_1.unstringify)(maybeDoc);
    }
    return createAsyncAPIDocument((0, utils_1.createDetailedAsyncAPI)(maybeDoc, maybeDoc));
}
exports.toAsyncAPIDocument = toAsyncAPIDocument;
function isAsyncAPIDocument(maybeDoc) {
    if (!maybeDoc) {
        return false;
    }
    if (maybeDoc instanceof models_1.AsyncAPIDocumentV2 || maybeDoc instanceof models_1.AsyncAPIDocumentV3) {
        return true;
    }
    if (maybeDoc && typeof maybeDoc.json === 'function') {
        const versionOfParserAPI = maybeDoc.json()[constants_1.xParserApiVersion];
        return versionOfParserAPI === models_1.ParserAPIVersion;
    }
    return false;
}
exports.isAsyncAPIDocument = isAsyncAPIDocument;
function isOldAsyncAPIDocument(maybeDoc) {
    if (maybeDoc && typeof maybeDoc.json === 'function') {
        const versionOfParserAPI = maybeDoc.json()[constants_1.xParserApiVersion];
        return versionOfParserAPI === undefined || versionOfParserAPI === 0;
    }
    return false;
}
exports.isOldAsyncAPIDocument = isOldAsyncAPIDocument;
function isParsedDocument(maybeDoc) {
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
        return false;
    }
    return Boolean(maybeDoc[constants_1.xParserSpecParsed]);
}
exports.isParsedDocument = isParsedDocument;
function isStringifiedDocument(maybeDoc) {
    try {
        maybeDoc = typeof maybeDoc === 'string' ? JSON.parse(maybeDoc) : maybeDoc;
        if (typeof maybeDoc !== 'object' || maybeDoc === null) {
            return false;
        }
        return (Boolean(maybeDoc[constants_1.xParserSpecParsed]) &&
            Boolean(maybeDoc[constants_1.xParserSpecStringified]));
    }
    catch (_) {
        return false;
    }
}
exports.isStringifiedDocument = isStringifiedDocument;
