"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAPIFormats = exports.Formats = void 0;
const utils_1 = require("../utils");
const specs_1 = require("@asyncapi/specs");
class Formats extends Map {
    filterByMajorVersions(majorsToInclude) {
        return new Formats([...this.entries()].filter(element => { return majorsToInclude.includes(element[0].split('.')[0]); }));
    }
    excludeByVersions(versionsToExclude) {
        return new Formats([...this.entries()].filter(element => { return !versionsToExclude.includes(element[0]); }));
    }
    find(version) {
        return this.get(formatVersion(version));
    }
    formats() {
        return [...this.values()];
    }
}
exports.Formats = Formats;
exports.AsyncAPIFormats = new Formats(Object.entries(specs_1.schemas).reverse().map(([version]) => [version, createFormat(version)])); // reverse is used for giving newer versions a higher priority when matching
function isAsyncAPIVersion(versionToMatch, document) {
    const asyncAPIDoc = document;
    if (!asyncAPIDoc)
        return false;
    const documentVersion = String(asyncAPIDoc.asyncapi);
    return (0, utils_1.isObject)(document) && 'asyncapi' in document
        && assertValidAsyncAPIVersion(documentVersion)
        && versionToMatch === formatVersion(documentVersion);
}
function assertValidAsyncAPIVersion(documentVersion) {
    const semver = (0, utils_1.getSemver)(documentVersion);
    const regexp = new RegExp(`^(${semver.major})\\.(${semver.minor})\\.(0|[1-9][0-9]*)$`); // eslint-disable-line security/detect-non-literal-regexp
    return regexp.test(documentVersion);
}
function createFormat(version) {
    const format = (document) => isAsyncAPIVersion(version, document);
    const semver = (0, utils_1.getSemver)(version);
    format.displayName = `AsyncAPI ${semver.major}.${semver.minor}.x`;
    return format;
}
const formatVersion = function (version) {
    const versionSemver = (0, utils_1.getSemver)(version);
    return `${versionSemver.major}.${versionSemver.minor}.0`;
};
