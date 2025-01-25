"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldInsertText = exports.getInputInsertText = exports.getInsertText = exports.hintList = exports.objectValues = void 0;
const graphql_1 = require("graphql");
function objectValues(object) {
    const keys = Object.keys(object);
    const len = keys.length;
    const values = new Array(len);
    for (let i = 0; i < len; ++i) {
        values[i] = object[keys[i]];
    }
    return values;
}
exports.objectValues = objectValues;
function hintList(token, list) {
    return filterAndSortList(list, normalizeText(token.string));
}
exports.hintList = hintList;
function filterAndSortList(list, text) {
    if (!text ||
        text.trim() === '' ||
        text.trim() === ':' ||
        text.trim() === '{') {
        return filterNonEmpty(list, entry => !entry.isDeprecated);
    }
    const byProximity = list.map(entry => ({
        proximity: getProximity(normalizeText(entry.label), text),
        entry,
    }));
    return filterNonEmpty(filterNonEmpty(byProximity, pair => pair.proximity <= 2), pair => !pair.entry.isDeprecated)
        .sort((a, b) => (a.entry.isDeprecated ? 1 : 0) - (b.entry.isDeprecated ? 1 : 0) ||
        a.proximity - b.proximity ||
        a.entry.label.length - b.entry.label.length)
        .map(pair => pair.entry);
}
function filterNonEmpty(array, predicate) {
    const filtered = array.filter(predicate);
    return filtered.length === 0 ? array : filtered;
}
function normalizeText(text) {
    return text.toLowerCase().replaceAll(/\W/g, '');
}
function getProximity(suggestion, text) {
    let proximity = lexicalDistance(text, suggestion);
    if (suggestion.length > text.length) {
        proximity -= suggestion.length - text.length - 1;
        proximity += suggestion.indexOf(text) === 0 ? 0 : 0.5;
    }
    return proximity;
}
function lexicalDistance(a, b) {
    let i;
    let j;
    const d = [];
    const aLength = a.length;
    const bLength = b.length;
    for (i = 0; i <= aLength; i++) {
        d[i] = [i];
    }
    for (j = 1; j <= bLength; j++) {
        d[0][j] = j;
    }
    for (i = 1; i <= aLength; i++) {
        for (j = 1; j <= bLength; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    return d[aLength][bLength];
}
const insertSuffix = (n) => ` {\n   $${n !== null && n !== void 0 ? n : 1}\n}`;
const getInsertText = (prefix, type, fallback) => {
    if (!type) {
        return fallback !== null && fallback !== void 0 ? fallback : prefix;
    }
    const namedType = (0, graphql_1.getNamedType)(type);
    if ((0, graphql_1.isObjectType)(namedType) ||
        (0, graphql_1.isInputObjectType)(namedType) ||
        (0, graphql_1.isListType)(namedType) ||
        (0, graphql_1.isAbstractType)(namedType)) {
        return prefix + insertSuffix();
    }
    return fallback !== null && fallback !== void 0 ? fallback : prefix;
};
exports.getInsertText = getInsertText;
const getInputInsertText = (prefix, type, fallback) => {
    if ((0, graphql_1.isListType)(type)) {
        const baseType = (0, graphql_1.getNamedType)(type.ofType);
        return prefix + `[${(0, exports.getInsertText)('', baseType, '$1')}]`;
    }
    return (0, exports.getInsertText)(prefix, type, fallback);
};
exports.getInputInsertText = getInputInsertText;
const getFieldInsertText = (field) => {
    const requiredArgs = field.args.filter(arg => arg.type.toString().endsWith('!'));
    if (!requiredArgs.length) {
        return;
    }
    return (field.name +
        `(${requiredArgs.map((arg, i) => `${arg.name}: $${i + 1}`)}) ${(0, exports.getInsertText)('', field.type, '\n')}`);
};
exports.getFieldInsertText = getFieldInsertText;
//# sourceMappingURL=autocompleteUtils.js.map