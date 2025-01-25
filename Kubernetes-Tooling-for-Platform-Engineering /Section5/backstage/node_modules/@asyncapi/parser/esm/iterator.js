/**
 * The different kind of stages when crawling a schema.
 */
export var SchemaIteratorCallbackType;
(function (SchemaIteratorCallbackType) {
    SchemaIteratorCallbackType["NEW_SCHEMA"] = "NEW_SCHEMA";
    SchemaIteratorCallbackType["END_SCHEMA"] = "END_SCHEMA";
})(SchemaIteratorCallbackType || (SchemaIteratorCallbackType = {}));
/**
 * The different types of schemas you can iterate
 */
export var SchemaTypesToIterate;
(function (SchemaTypesToIterate) {
    SchemaTypesToIterate["Parameters"] = "parameters";
    SchemaTypesToIterate["Payloads"] = "payloads";
    SchemaTypesToIterate["Headers"] = "headers";
    SchemaTypesToIterate["Components"] = "components";
    SchemaTypesToIterate["Objects"] = "objects";
    SchemaTypesToIterate["Arrays"] = "arrays";
    SchemaTypesToIterate["OneOfs"] = "oneOfs";
    SchemaTypesToIterate["AllOfs"] = "allOfs";
    SchemaTypesToIterate["AnyOfs"] = "anyOfs";
    SchemaTypesToIterate["Nots"] = "nots";
    SchemaTypesToIterate["PropertyNames"] = "propertyNames";
    SchemaTypesToIterate["PatternProperties"] = "patternProperties";
    SchemaTypesToIterate["Contains"] = "contains";
    SchemaTypesToIterate["Ifs"] = "ifs";
    SchemaTypesToIterate["Thenes"] = "thenes";
    SchemaTypesToIterate["Elses"] = "elses";
    SchemaTypesToIterate["Dependencies"] = "dependencies";
    SchemaTypesToIterate["Definitions"] = "definitions";
})(SchemaTypesToIterate || (SchemaTypesToIterate = {}));
/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 */
export function traverseAsyncApiDocument(doc, callback, schemaTypesToIterate = []) {
    if (schemaTypesToIterate.length === 0) {
        schemaTypesToIterate = Object.values(SchemaTypesToIterate);
    }
    const options = { callback, schemaTypesToIterate, seenSchemas: new Set() };
    if (!doc.channels().isEmpty()) {
        doc.channels().all().forEach(channel => {
            traverseChannel(channel, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Components) && !doc.components().isEmpty()) {
        const components = doc.components();
        Object.values(components.messages().all() || {}).forEach(message => {
            traverseMessage(message, options);
        });
        Object.values(components.schemas().all() || {}).forEach(schema => {
            traverseSchema(schema, null, options);
        });
        if (schemaTypesToIterate.includes(SchemaTypesToIterate.Parameters)) {
            Object.values(components.channelParameters().filterBy((param) => { return param.hasSchema(); })).forEach(parameter => {
                traverseSchema(parameter.schema(), null, options);
            });
        }
        Object.values(components.messageTraits().all() || {}).forEach(messageTrait => {
            traverseMessageTrait(messageTrait, options);
        });
    }
}
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
    if (!schemaTypesToIterate.includes(SchemaTypesToIterate.Objects) && types.includes('object'))
        return;
    if (!schemaTypesToIterate.includes(SchemaTypesToIterate.Arrays) && types.includes('array'))
        return;
    // check callback `NEW_SCHEMA` case
    if (callback(schema, propOrIndex, SchemaIteratorCallbackType.NEW_SCHEMA) === false)
        return;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Objects) && types.includes('object')) {
        recursiveSchemaObject(schema, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Arrays) && types.includes('array')) {
        recursiveSchemaArray(schema, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.OneOfs)) {
        (schema.oneOf() || []).forEach((combineSchema, idx) => {
            traverseSchema(combineSchema, idx, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.AnyOfs)) {
        (schema.anyOf() || []).forEach((combineSchema, idx) => {
            traverseSchema(combineSchema, idx, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.AllOfs)) {
        (schema.allOf() || []).forEach((combineSchema, idx) => {
            traverseSchema(combineSchema, idx, options);
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Nots) && schema.not()) {
        traverseSchema(schema.not(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Ifs) && schema.if()) {
        traverseSchema(schema.if(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Thenes) && schema.then()) {
        traverseSchema(schema.then(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Elses) && schema.else()) {
        traverseSchema(schema.else(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Dependencies)) {
        Object.entries(schema.dependencies() || {}).forEach(([depName, dep]) => {
            // do not iterate dependent required
            if (dep && !Array.isArray(dep)) {
                traverseSchema(dep, depName, options);
            }
        });
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Definitions)) {
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
    Object.entries(schema.properties() || {}).forEach(([propertyName, property]) => {
        traverseSchema(property, propertyName, options);
    });
    const additionalProperties = schema.additionalProperties();
    if (typeof additionalProperties === 'object') {
        traverseSchema(additionalProperties, null, options);
    }
    const schemaTypesToIterate = options.schemaTypesToIterate;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.PropertyNames) && schema.propertyNames()) {
        traverseSchema(schema.propertyNames(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.PatternProperties)) {
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
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Parameters)) {
        Object.values(channel.parameters().filterBy((param) => { return param.hasSchema(); }) || {}).forEach(parameter => {
            traverseSchema(parameter.schema(), null, options);
        });
    }
    channel.messages().all().forEach(message => {
        traverseMessage(message, options);
    });
}
/**
 * Go through each schema in a message
 */
function traverseMessage(message, options) {
    if (!message)
        return;
    const { schemaTypesToIterate } = options;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Headers) && message.hasHeaders()) {
        traverseSchema(message.headers(), null, options);
    }
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Payloads) && message.hasPayload()) {
        traverseSchema(message.payload(), null, options);
    }
}
/**
 * Go through each schema in a messageTrait
 */
function traverseMessageTrait(messageTrait, options) {
    if (!messageTrait)
        return;
    const { schemaTypesToIterate } = options;
    if (schemaTypesToIterate.includes(SchemaTypesToIterate.Headers) && messageTrait.hasHeaders()) {
        traverseSchema(messageTrait.headers(), null, options);
    }
}
