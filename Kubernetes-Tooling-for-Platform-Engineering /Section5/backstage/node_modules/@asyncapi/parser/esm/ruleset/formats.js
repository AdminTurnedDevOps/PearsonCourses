import { getSemver, isObject } from '../utils';
import { schemas } from '@asyncapi/specs';
export class Formats extends Map {
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
export const AsyncAPIFormats = new Formats(Object.entries(schemas).reverse().map(([version]) => [version, createFormat(version)])); // reverse is used for giving newer versions a higher priority when matching
function isAsyncAPIVersion(versionToMatch, document) {
    const asyncAPIDoc = document;
    if (!asyncAPIDoc)
        return false;
    const documentVersion = String(asyncAPIDoc.asyncapi);
    return isObject(document) && 'asyncapi' in document
        && assertValidAsyncAPIVersion(documentVersion)
        && versionToMatch === formatVersion(documentVersion);
}
function assertValidAsyncAPIVersion(documentVersion) {
    const semver = getSemver(documentVersion);
    const regexp = new RegExp(`^(${semver.major})\\.(${semver.minor})\\.(0|[1-9][0-9]*)$`); // eslint-disable-line security/detect-non-literal-regexp
    return regexp.test(documentVersion);
}
function createFormat(version) {
    const format = (document) => isAsyncAPIVersion(version, document);
    const semver = getSemver(version);
    format.displayName = `AsyncAPI ${semver.major}.${semver.minor}.x`;
    return format;
}
const formatVersion = function (version) {
    const versionSemver = getSemver(version);
    return `${versionSemver.major}.${versionSemver.minor}.0`;
};
