import { AsyncAPIDocumentV2, AsyncAPIDocumentV3, ParserAPIVersion } from './models';
import { unstringify } from './stringify';
import { createDetailedAsyncAPI } from './utils';
import { xParserSpecParsed, xParserSpecStringified, xParserApiVersion, } from './constants';
export function createAsyncAPIDocument(asyncapi) {
    switch (asyncapi.semver.major) {
        case 2:
            return new AsyncAPIDocumentV2(asyncapi.parsed, { asyncapi, pointer: '/' });
        case 3:
            return new AsyncAPIDocumentV3(asyncapi.parsed, { asyncapi, pointer: '/' });
        default:
            throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
    }
}
export function toAsyncAPIDocument(maybeDoc) {
    if (isAsyncAPIDocument(maybeDoc)) {
        return maybeDoc;
    }
    if (!isParsedDocument(maybeDoc)) {
        return unstringify(maybeDoc);
    }
    return createAsyncAPIDocument(createDetailedAsyncAPI(maybeDoc, maybeDoc));
}
export function isAsyncAPIDocument(maybeDoc) {
    if (!maybeDoc) {
        return false;
    }
    if (maybeDoc instanceof AsyncAPIDocumentV2 || maybeDoc instanceof AsyncAPIDocumentV3) {
        return true;
    }
    if (maybeDoc && typeof maybeDoc.json === 'function') {
        const versionOfParserAPI = maybeDoc.json()[xParserApiVersion];
        return versionOfParserAPI === ParserAPIVersion;
    }
    return false;
}
export function isOldAsyncAPIDocument(maybeDoc) {
    if (maybeDoc && typeof maybeDoc.json === 'function') {
        const versionOfParserAPI = maybeDoc.json()[xParserApiVersion];
        return versionOfParserAPI === undefined || versionOfParserAPI === 0;
    }
    return false;
}
export function isParsedDocument(maybeDoc) {
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
        return false;
    }
    return Boolean(maybeDoc[xParserSpecParsed]);
}
export function isStringifiedDocument(maybeDoc) {
    try {
        maybeDoc = typeof maybeDoc === 'string' ? JSON.parse(maybeDoc) : maybeDoc;
        if (typeof maybeDoc !== 'object' || maybeDoc === null) {
            return false;
        }
        return (Boolean(maybeDoc[xParserSpecParsed]) &&
            Boolean(maybeDoc[xParserSpecStringified]));
    }
    catch (_) {
        return false;
    }
}
