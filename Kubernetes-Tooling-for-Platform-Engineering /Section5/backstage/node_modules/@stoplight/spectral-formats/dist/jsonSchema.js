"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDialect = exports.extractDraftVersion = exports.jsonSchemaDraft2020_12 = exports.jsonSchemaDraft2019_09 = exports.jsonSchemaDraft7 = exports.jsonSchemaDraft6 = exports.jsonSchemaDraft4 = exports.jsonSchemaLoose = exports.jsonSchema = void 0;
const json_1 = require("@stoplight/json");
const KNOWN_JSON_SCHEMA_TYPES = ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'];
const KNOWN_JSON_SCHEMA_COMPOUND_KEYWORDS = ['allOf', 'oneOf', 'anyOf', 'not', 'if'];
const SCHEMA_DRAFT_REGEX = /^https?:\/\/json-schema.org\/(?:draft-0([467])|draft\/(20(?:19-09|20-12)))\/(?:hyper-)?schema#?$/;
const hasValidJSONSchemaType = (document) => {
    if (!('type' in document))
        return false;
    if (typeof document.type === 'string') {
        return KNOWN_JSON_SCHEMA_TYPES.includes(document.type);
    }
    return Array.isArray(document.type) && document.type.every(type => KNOWN_JSON_SCHEMA_TYPES.includes(type));
};
const hasValidJSONSchemaEnumKeyword = (document) => Array.isArray(document['enum']);
const hasValidJSONSchemaCompoundKeyword = (document) => KNOWN_JSON_SCHEMA_COMPOUND_KEYWORDS.some(combiner => combiner in document && typeof document[combiner] === 'object' && document[combiner] !== null);
function hasSchemaVersion(document) {
    return ((0, json_1.isPlainObject)(document) &&
        '$schema' in document &&
        typeof document.$schema === 'string');
}
const isJsonSchema = (document) => hasSchemaVersion(document) && document.$schema.includes('//json-schema.org/');
exports.jsonSchema = isJsonSchema;
exports.jsonSchema.displayName = 'JSON Schema';
const jsonSchemaLoose = (document) => (0, json_1.isPlainObject)(document) &&
    (isJsonSchema(document) ||
        hasValidJSONSchemaType(document) ||
        hasValidJSONSchemaEnumKeyword(document) ||
        hasValidJSONSchemaCompoundKeyword(document));
exports.jsonSchemaLoose = jsonSchemaLoose;
exports.jsonSchemaLoose.displayName = 'JSON Schema (loose)';
exports.jsonSchemaDraft4 = createJsonSchemaFormat('draft4', 'JSON Schema Draft 4');
exports.jsonSchemaDraft6 = createJsonSchemaFormat('draft6', 'JSON Schema Draft 6');
exports.jsonSchemaDraft7 = createJsonSchemaFormat('draft7', 'JSON Schema Draft 7');
exports.jsonSchemaDraft2019_09 = createJsonSchemaFormat('draft2019-09', 'JSON Schema Draft 2019-09');
exports.jsonSchemaDraft2020_12 = createJsonSchemaFormat('draft2020-12', 'JSON Schema Draft 2020-12');
function createJsonSchemaFormat(draft, name) {
    const format = (document) => isJsonSchema(document) && extractDraftVersion(document.$schema) === draft;
    format.displayName = name;
    return format;
}
function extractDraftVersion($schema) {
    var _a;
    const match = SCHEMA_DRAFT_REGEX.exec($schema);
    return match !== null ? `draft${(_a = match[1]) !== null && _a !== void 0 ? _a : match[2]}` : null;
}
exports.extractDraftVersion = extractDraftVersion;
function detectDialect(document) {
    if (!isJsonSchema(document)) {
        return null;
    }
    return extractDraftVersion(document.$schema);
}
exports.detectDialect = detectDialect;
//# sourceMappingURL=jsonSchema.js.map