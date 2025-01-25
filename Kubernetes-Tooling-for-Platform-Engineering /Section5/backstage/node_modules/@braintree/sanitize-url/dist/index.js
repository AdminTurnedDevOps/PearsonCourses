"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUrl = void 0;
var constants_1 = require("./constants");
function isRelativeUrlWithoutProtocol(url) {
    return constants_1.relativeFirstCharacters.indexOf(url[0]) > -1;
}
// adapted from https://stackoverflow.com/a/29824550/2601552
function decodeHtmlCharacters(str) {
    var removedNullByte = str.replace(constants_1.ctrlCharactersRegex, "");
    return removedNullByte.replace(constants_1.htmlEntitiesRegex, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
function decodeURI(uri) {
    try {
        return decodeURIComponent(uri);
    }
    catch (e) {
        // Ignoring error
        // It is possible that the URI contains a `%` not associated
        // with URI/URL-encoding.
        return uri;
    }
}
function sanitizeUrl(url) {
    if (!url) {
        return constants_1.BLANK_URL;
    }
    var charsToDecode;
    var decodedUrl = decodeURI(url);
    do {
        decodedUrl = decodeHtmlCharacters(decodedUrl)
            .replace(constants_1.htmlCtrlEntityRegex, "")
            .replace(constants_1.ctrlCharactersRegex, "")
            .replace(constants_1.whitespaceEscapeCharsRegex, "")
            .trim();
        decodedUrl = decodeURI(decodedUrl);
        charsToDecode =
            decodedUrl.match(constants_1.ctrlCharactersRegex) ||
                decodedUrl.match(constants_1.htmlEntitiesRegex) ||
                decodedUrl.match(constants_1.htmlCtrlEntityRegex) ||
                decodedUrl.match(constants_1.whitespaceEscapeCharsRegex);
    } while (charsToDecode && charsToDecode.length > 0);
    var sanitizedUrl = decodedUrl;
    if (!sanitizedUrl) {
        return constants_1.BLANK_URL;
    }
    if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
        return sanitizedUrl;
    }
    var urlSchemeParseResults = sanitizedUrl.match(constants_1.urlSchemeRegex);
    if (!urlSchemeParseResults) {
        return sanitizedUrl;
    }
    var urlScheme = urlSchemeParseResults[0];
    if (constants_1.invalidProtocolRegex.test(urlScheme)) {
        return constants_1.BLANK_URL;
    }
    return sanitizedUrl;
}
exports.sanitizeUrl = sanitizeUrl;
