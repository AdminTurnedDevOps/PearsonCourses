import { AsyncAPIDocument } from './asyncapi';
import { xParserApiVersion, xParserOriginalPayload, xParserOriginalSchemaFormat, xParserOriginalTraits, xParserMessageParsed } from '../constants';
import { createAsyncAPIDocument } from '../document';
import { copy } from '../stringify';
import { getDefaultSchemaFormat } from '../schema-parser';
import { createDetailedAsyncAPI, setExtension } from '../utils';
export function convertToOldAPI(newDocument) {
    const data = copy(newDocument.json());
    const document = new AsyncAPIDocument(data);
    handleMessages(document);
    handleOperations(document);
    setExtension(xParserApiVersion, 0, document);
    return document;
}
export function convertToNewAPI(oldDocument) {
    const data = copy(oldDocument.json());
    const detailed = createDetailedAsyncAPI(data);
    return createAsyncAPIDocument(detailed);
}
function handleMessages(document) {
    const defaultSchemaFormat = getDefaultSchemaFormat(document.version());
    for (const message of document.allMessages().values()) {
        const json = message.json();
        if (json.traits) {
            json[xParserOriginalTraits] = json.traits;
            delete json.traits;
        }
        json[xParserOriginalSchemaFormat] = json.schemaFormat || defaultSchemaFormat;
        json.schemaFormat = defaultSchemaFormat;
        json[xParserOriginalPayload] = json[xParserOriginalPayload] || json.payload;
        json[xParserMessageParsed] = true;
    }
}
function handleOperations(document) {
    Object.values(document.channels()).forEach(channel => {
        const publish = channel.publish();
        const subscribe = channel.subscribe();
        if (publish) {
            const json = publish.json();
            if (json.traits) {
                json[xParserOriginalTraits] = json.traits;
                delete json.traits;
            }
        }
        if (subscribe) {
            const json = subscribe.json();
            if (json.traits) {
                json[xParserOriginalTraits] = json.traits;
                delete json.traits;
            }
        }
    });
}
