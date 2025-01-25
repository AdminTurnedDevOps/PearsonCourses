"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymousNaming = void 0;
const constants_1 = require("../constants");
const iterator_1 = require("../iterator");
const utils_1 = require("../utils");
function anonymousNaming(document) {
    assignNameToComponentMessages(document);
    assignNameToAnonymousMessages(document);
    assignUidToComponentSchemas(document);
    assignUidToComponentParameterSchemas(document);
    assignUidToChannelParameterSchemas(document);
    assignUidToAnonymousSchemas(document);
}
exports.anonymousNaming = anonymousNaming;
function assignNameToComponentMessages(document) {
    document.components().messages().forEach(message => {
        if (message.name() === undefined) {
            (0, utils_1.setExtension)(constants_1.xParserMessageName, message.id(), message);
        }
    });
}
function assignNameToAnonymousMessages(document) {
    let anonymousMessageCounter = 0;
    document.messages().forEach(message => {
        var _a;
        if (message.name() === undefined && ((_a = message.extensions().get(constants_1.xParserMessageName)) === null || _a === void 0 ? void 0 : _a.value()) === undefined) {
            (0, utils_1.setExtension)(constants_1.xParserMessageName, message.id() || `<anonymous-message-${++anonymousMessageCounter}>`, message);
        }
    });
}
function assignUidToComponentParameterSchemas(document) {
    document.components().channelParameters().forEach(parameter => {
        const schema = parameter.schema();
        if (schema && !schema.id()) {
            (0, utils_1.setExtension)(constants_1.xParserSchemaId, parameter.id(), schema);
        }
    });
}
function assignUidToChannelParameterSchemas(document) {
    document.channels().forEach(channel => {
        channel.parameters().forEach(parameter => {
            const schema = parameter.schema();
            if (schema && !schema.id()) {
                (0, utils_1.setExtension)(constants_1.xParserSchemaId, parameter.id(), schema);
            }
        });
    });
}
function assignUidToComponentSchemas(document) {
    document.components().schemas().forEach(schema => {
        (0, utils_1.setExtension)(constants_1.xParserSchemaId, schema.id(), schema);
    });
}
function assignUidToAnonymousSchemas(doc) {
    let anonymousSchemaCounter = 0;
    function callback(schema) {
        const json = schema.json();
        const isMultiFormatSchema = json.schema !== undefined;
        const underlyingSchema = isMultiFormatSchema ? json.schema : json;
        if (!schema.id()) {
            (0, utils_1.setExtensionOnJson)(constants_1.xParserSchemaId, `<anonymous-schema-${++anonymousSchemaCounter}>`, underlyingSchema);
        }
    }
    (0, iterator_1.traverseAsyncApiDocument)(doc, callback);
}
