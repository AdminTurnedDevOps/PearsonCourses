"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseAsyncApiDocument = exports.SchemaTypesToIterate = exports.SchemaIteratorCallbackType = void 0;
/**
 * The different kind of stages when crawling a schema.
 */
var SchemaIteratorCallbackType;
(function (SchemaIteratorCallbackType) {
    SchemaIteratorCallbackType["NEW_SCHEMA"] = "NEW_SCHEMA";
    SchemaIteratorCallbackType["END_SCHEMA"] = "END_SCHEMA";
})(SchemaIteratorCallbackType = exports.SchemaIteratorCallbackType || (exports.SchemaIteratorCallbackType = {}));
/**
 * The different types of schemas you can iterate
 */
var SchemaTypesToIterate;
(function (SchemaTypesToIterate) {
    SchemaTypesToIterate["parameters"] = "parameters";
    SchemaTypesToIterate["payloads"] = "payloads";
    SchemaTypesToIterate["headers"] = "headers";
    SchemaTypesToIterate["components"] = "components";
    SchemaTypesToIterate["objects"] = "objects";
    SchemaTypesToIterate["arrays"] = "arrays";
    SchemaTypesToIterate["oneOfs"] = "oneOfs";
    SchemaTypesToIterate["allOfs"] = "allOfs";
    SchemaTypesToIterate["anyOfs"] = "anyOfs";
    SchemaTypesToIterate["nots"] = "nots";
    SchemaTypesToIterate["propertyNames"] = "propertyNames";
    SchemaTypesToIterate["patternProperties"] = "patternProperties";
    SchemaTypesToIterate["contains"] = "contains";
    SchemaTypesToIterate["ifs"] = "ifs";
    SchemaTypesToIterate["thenes"] = "thenes";
    SchemaTypesToIterate["elses"] = "elses";
    SchemaTypesToIterate["dependencies"] = "dependencies";
    SchemaTypesToIterate["definitions"] = "definitions";
})(SchemaTypesToIterate = exports.SchemaTypesToIterate || (exports.SchemaTypesToIterate = {}));
/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 */
function traverseAsyncApiDocument(doc, callback, schemaTypesToIterate = []) {
    if (schemaTypesToIterate.length === 0) {
        schemaTypesToIterate = Object.values(SchemaTypesToIterate);
    }
    const options = { callback, schemaTypesToIterate, seenSchemas: new Set() };
    Object.values(doc.channels()).forEach(channel => {
        traverseChannel(channel, options);
    });
    const components = doc.components();
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.components) && components) {
        Object.values(components.messages()).forEach(message => {
            traverseMessage(message, options);
        });
        Object.values(components.schemas()).forEach(schema => {
            traverseSchema(schema, null, options);
        });
        if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
            Object.values(components.parameters()).forEach(parameter => {
                const schema = parameter.schema();
                if (schema) {
                    traverseSchema(schema, null, options);
                }
            });
        }
        Object.values(components.messageTraits()).forEach(messageTrait => {
            traverseMessageTrait(messageTrait, options);
        });
    }
}
exports.traverseAsyncApiDocument = traverseAsyncApiDocument;
/* eslint-disable sonarjs/cognitive-complexity */
/**
 * Traverse current schema and all nested schemas.
 */
function traverseSchema(schema, propOrIndex, options) {
    if (!schema)
        return;
    const { schemaTypesToIterate, callback, seenSchemas } = options;
    // handle circular references
    const jsonSchema = schema.json();
    if (seenSchemas.has(jsonSchema))
        return;
    seenSchemas.add(jsonSchema);
    // `type` isn't required so save type as array in the fallback
    let types = schema.type() || [];
    // change primitive type to array of types for easier handling
    if (!Array.isArray(types)) {
        types = [types];
    }
    if (!schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && types.includes('object'))
        return;
    if (!schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && types.includes('array'))
        return;
    // check callback `NEW_SCHEMA` case
    if (callback(schema, propOrIndex, SchemaIteratorCallbackType.NEW_SCHEMA) === false)
        return;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.objects) && types.includes('object')) {
        recursiveSchemaObject(schema, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.arrays) && types.includes('array')) {
        recursiveSchemaArray(schema, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.oneOfs)) {
        (schema.oneOf() || []).forEach((combineSchema, idx) => {
            traverseSchema(combineSchema, idx, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.anyOfs)) {
        (schema.anyOf() || []).forEach((combineSchema, idx) => {
            traverseSchema(combineSchema, idx, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.allOfs)) {
        (schema.allOf() || []).forEach((combineSchema, idx) => {
            traverseSchema(combineSchema, idx, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.nots) && schema.not()) {
        traverseSchema(schema.not(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.ifs) && schema.if()) {
        traverseSchema(schema.if(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.thenes) && schema.then()) {
        traverseSchema(schema.then(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.elses) && schema.else()) {
        traverseSchema(schema.else(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.dependencies)) {
        Object.entries(schema.dependencies() || {}).forEach(([depName, dep]) => {
            // do not iterate dependent required
            if (dep && !Array.isArray(dep)) {
                traverseSchema(dep, depName, options);
            }
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.definitions)) {
        Object.entries(schema.definitions() || {}).forEach(([defName, def]) => {
            traverseSchema(def, defName, options);
        });
    }
    callback(schema, propOrIndex, SchemaIteratorCallbackType.END_SCHEMA);
    seenSchemas.delete(jsonSchema);
}
/* eslint-enable sonarjs/cognitive-complexity */
/**
 * Recursively go through schema of object type and execute callback.
 */
function recursiveSchemaObject(schema, options) {
    Object.entries(schema.properties()).forEach(([propertyName, property]) => {
        traverseSchema(property, propertyName, options);
    });
    const additionalProperties = schema.additionalProperties();
    if (typeof additionalProperties === 'object') {
        traverseSchema(additionalProperties, null, options);
    }
    const schemaTypesToIterate = options.schemaTypesToIterate;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.propertyNames) && schema.propertyNames()) {
        traverseSchema(schema.propertyNames(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.patternProperties)) {
        Object.entries(schema.patternProperties() || {}).forEach(([propertyName, property]) => {
            traverseSchema(property, propertyName, options);
        });
    }
}
/**
 * Recursively go through schema of array type and execute callback.
 */
function recursiveSchemaArray(schema, options) {
    const items = schema.items();
    if (items) {
        if (Array.isArray(items)) {
            items.forEach((item, idx) => {
                traverseSchema(item, idx, options);
            });
        }
        else {
            traverseSchema(items, null, options);
        }
    }
    const additionalItems = schema.additionalItems();
    if (typeof additionalItems === 'object') {
        traverseSchema(additionalItems, null, options);
    }
    if (options.schemaTypesToIterate.includes('contains') && schema.contains()) {
        traverseSchema(schema.contains(), null, options);
    }
}
/**
 * Go through each schema in channel
 */
function traverseChannel(channel, options) {
    if (!channel)
        return;
    const { schemaTypesToIterate } = options;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.parameters)) {
        Object.values(channel.parameters() || {}).forEach(parameter => {
            const schema = parameter.schema();
            if (schema) {
                traverseSchema(schema, null, options);
            }
        });
    }
    const publish = channel.publish();
    if (publish) {
        publish.messages().forEach(message => {
            traverseMessage(message, options);
        });
    }
    const subscribe = channel.subscribe();
    if (subscribe) {
        subscribe.messages().forEach(message => {
            traverseMessage(message, options);
        });
    }
}
/**
 * Go through each schema in a message
 */
function traverseMessage(message, options) {
    if (!message)
        return;
    const { schemaTypesToIterate } = options;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
        const headers = message.headers();
        if (headers) {
            traverseSchema(headers, null, options);
        }
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.payloads)) {
        const payload = message.payload();
        if (payload) {
            traverseSchema(payload, null, options);
        }
    }
}
/**
 * Go through each schema in a messageTrait
 */
function traverseMessageTrait(messageTrait, options) {
    if (!messageTrait)
        return;
    const { schemaTypesToIterate } = options;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.headers)) {
        const headers = messageTrait.headers();
        if (headers) {
            traverseSchema(headers, null, options);
        }
    }
}
