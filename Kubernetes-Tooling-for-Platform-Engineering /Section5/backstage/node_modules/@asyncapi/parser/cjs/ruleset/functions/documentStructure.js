"use strict";
/* eslint-disable sonarjs/no-duplicate-string */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentStructure = exports.getSchema = void 0;
const specs_1 = __importDefault(require("@asyncapi/specs"));
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_functions_1 = require("@stoplight/spectral-functions");
const formats_1 = require("../formats");
const utils_1 = require("../../utils");
function shouldIgnoreError(error) {
    return (
    // oneOf is a fairly error as we have 2 options to choose from for most of the time.
    error.keyword === 'oneOf' ||
        // the required $ref is entirely useless, since aas-schema rules operate on resolved content, so there won't be any $refs in the document
        (error.keyword === 'required' && error.params.missingProperty === '$ref'));
}
// ajv throws a lot of errors that have no understandable context, e.g. errors related to the fact that a value doesn't meet the conditions of some sub-schema in `oneOf`, `anyOf` etc.
// for this reason, we filter these unnecessary errors and leave only the most important ones (usually the first occurring in the list of errors). 
function prepareResults(errors) {
    // Update additionalProperties errors to make them more precise and prevent them from being treated as duplicates
    for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        if (error.keyword === 'additionalProperties') {
            error.instancePath = `${error.instancePath}/${String(error.params['additionalProperty'])}`;
        }
        else if (error.keyword === 'required' && error.params.missingProperty === '$ref') {
            errors.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        if (i + 1 < errors.length && errors[i + 1].instancePath === error.instancePath) {
            errors.splice(i + 1, 1);
            i--;
        }
        else if (i > 0 && shouldIgnoreError(error) && errors[i - 1].instancePath.startsWith(error.instancePath)) {
            errors.splice(i, 1);
            i--;
        }
    }
}
// this is needed because some v3 object fields are expected to be only `$ref` to other objects. 
// In order to validate resolved references, we modify those schemas and instead allow the definition of the object
function prepareV3ResolvedSchema(copied) {
    // channel object
    const channelObject = copied.definitions['http://asyncapi.com/definitions/3.0.0/channel.json'];
    channelObject.properties.servers.items.$ref = 'http://asyncapi.com/definitions/3.0.0/server.json';
    // operation object
    const operationSchema = copied.definitions['http://asyncapi.com/definitions/3.0.0/operation.json'];
    operationSchema.properties.channel.$ref = 'http://asyncapi.com/definitions/3.0.0/channel.json';
    operationSchema.properties.messages.items.$ref = 'http://asyncapi.com/definitions/3.0.0/messageObject.json';
    // operation reply object
    const operationReplySchema = copied.definitions['http://asyncapi.com/definitions/3.0.0/operationReply.json'];
    operationReplySchema.properties.channel.$ref = 'http://asyncapi.com/definitions/3.0.0/channel.json';
    operationReplySchema.properties.messages.items.$ref = 'http://asyncapi.com/definitions/3.0.0/messageObject.json';
    return copied;
}
function getCopyOfSchema(version) {
    return JSON.parse(JSON.stringify(specs_1.default.schemas[version]));
}
const serializedSchemas = new Map();
function getSerializedSchema(version, resolved) {
    const serializedSchemaKey = resolved ? `${version}-resolved` : `${version}-unresolved`;
    const schema = serializedSchemas.get(serializedSchemaKey);
    if (schema) {
        return schema;
    }
    // Copy to not operate on the original json schema - between imports (in different modules) we operate on this same schema.
    let copied = getCopyOfSchema(version);
    // Remove the meta schemas because they are already present within Ajv, and it's not possible to add duplicated schemas.
    delete copied.definitions['http://json-schema.org/draft-07/schema'];
    delete copied.definitions['http://json-schema.org/draft-04/schema'];
    // Spectral caches the schemas using '$id' property
    copied['$id'] = copied['$id'].replace('asyncapi.json', `asyncapi-${resolved ? 'resolved' : 'unresolved'}.json`);
    const { major } = (0, utils_1.getSemver)(version);
    if (resolved && major === 3) {
        copied = prepareV3ResolvedSchema(copied);
    }
    serializedSchemas.set(serializedSchemaKey, copied);
    return copied;
}
const refErrorMessage = 'Property "$ref" is not expected to be here';
function filterRefErrors(errors, resolved) {
    if (resolved) {
        return errors.filter(err => err.message !== refErrorMessage);
    }
    return errors
        .filter(err => err.message === refErrorMessage)
        .map(err => {
        err.message = 'Referencing in this place is not allowed';
        return err;
    });
}
function getSchema(docFormats, resolved) {
    for (const [version, format] of formats_1.AsyncAPIFormats) {
        if (docFormats.has(format)) {
            return getSerializedSchema(version, resolved);
        }
    }
}
exports.getSchema = getSchema;
exports.documentStructure = (0, spectral_core_1.createRulesetFunction)({
    input: null,
    options: {
        type: 'object',
        properties: {
            resolved: {
                type: 'boolean',
            },
        },
        required: ['resolved'],
    },
}, (targetVal, options, context) => {
    var _a;
    const formats = (_a = context.document) === null || _a === void 0 ? void 0 : _a.formats;
    if (!formats) {
        return;
    }
    const resolved = options.resolved;
    const schema = getSchema(formats, resolved);
    if (!schema) {
        return;
    }
    const errors = (0, spectral_functions_1.schema)(targetVal, { allErrors: true, schema, prepareResults: resolved ? prepareResults : undefined }, context);
    if (!Array.isArray(errors)) {
        return;
    }
    return filterRefErrors(errors, resolved);
});
