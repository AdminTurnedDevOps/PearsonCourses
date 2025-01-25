import { xParserMessageName, xParserSchemaId } from '../constants';
import { traverseAsyncApiDocument } from '../iterator';
import { setExtension, setExtensionOnJson } from '../utils';
export function anonymousNaming(document) {
    assignNameToComponentMessages(document);
    assignNameToAnonymousMessages(document);
    assignUidToComponentSchemas(document);
    assignUidToComponentParameterSchemas(document);
    assignUidToChannelParameterSchemas(document);
    assignUidToAnonymousSchemas(document);
}
function assignNameToComponentMessages(document) {
    document.components().messages().forEach(message => {
        if (message.name() === undefined) {
            setExtension(xParserMessageName, message.id(), message);
        }
    });
}
function assignNameToAnonymousMessages(document) {
    let anonymousMessageCounter = 0;
    document.messages().forEach(message => {
        var _a;
        if (message.name() === undefined && ((_a = message.extensions().get(xParserMessageName)) === null || _a === void 0 ? void 0 : _a.value()) === undefined) {
            setExtension(xParserMessageName, message.id() || `<anonymous-message-${++anonymousMessageCounter}>`, message);
        }
    });
}
function assignUidToComponentParameterSchemas(document) {
    document.components().channelParameters().forEach(parameter => {
        const schema = parameter.schema();
        if (schema && !schema.id()) {
            setExtension(xParserSchemaId, parameter.id(), schema);
        }
    });
}
function assignUidToChannelParameterSchemas(document) {
    document.channels().forEach(channel => {
        channel.parameters().forEach(parameter => {
            const schema = parameter.schema();
            if (schema && !schema.id()) {
                setExtension(xParserSchemaId, parameter.id(), schema);
            }
        });
    });
}
function assignUidToComponentSchemas(document) {
    document.components().schemas().forEach(schema => {
        setExtension(xParserSchemaId, schema.id(), schema);
    });
}
function assignUidToAnonymousSchemas(doc) {
    let anonymousSchemaCounter = 0;
    function callback(schema) {
        const json = schema.json();
        const isMultiFormatSchema = json.schema !== undefined;
        const underlyingSchema = isMultiFormatSchema ? json.schema : json;
        if (!schema.id()) {
            setExtensionOnJson(xParserSchemaId, `<anonymous-schema-${++anonymousSchemaCounter}>`, underlyingSchema);
        }
    }
    traverseAsyncApiDocument(doc, callback);
}
