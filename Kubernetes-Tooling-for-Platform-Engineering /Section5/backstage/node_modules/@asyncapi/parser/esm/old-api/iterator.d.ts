import type { AsyncAPIDocument } from './asyncapi';
import type { Schema } from './schema';
/**
 * The different kind of stages when crawling a schema.
 */
export declare enum SchemaIteratorCallbackType {
    NEW_SCHEMA = "NEW_SCHEMA",
    END_SCHEMA = "END_SCHEMA"
}
/**
 * The different types of schemas you can iterate
 */
export declare enum SchemaTypesToIterate {
    parameters = "parameters",
    payloads = "payloads",
    headers = "headers",
    components = "components",
    objects = "objects",
    arrays = "arrays",
    oneOfs = "oneOfs",
    allOfs = "allOfs",
    anyOfs = "anyOfs",
    nots = "nots",
    propertyNames = "propertyNames",
    patternProperties = "patternProperties",
    contains = "contains",
    ifs = "ifs",
    thenes = "thenes",
    elses = "elses",
    dependencies = "dependencies",
    definitions = "definitions"
}
export type TraverseOptions = {
    callback: TraverseCallback;
    schemaTypesToIterate: Array<`${SchemaTypesToIterate}`>;
    seenSchemas: Set<any>;
};
export type TraverseCallback = (schema: Schema, propOrIndex: string | number | null, callbackType: SchemaIteratorCallbackType) => boolean | void;
/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 */
export declare function traverseAsyncApiDocument(doc: AsyncAPIDocument, callback: TraverseCallback, schemaTypesToIterate?: Array<`${SchemaTypesToIterate}`>): void;
