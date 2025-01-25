import type { AsyncAPIDocumentInterface } from './models/asyncapi';
import type { SchemaInterface } from './models/schema';
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
    Parameters = "parameters",
    Payloads = "payloads",
    Headers = "headers",
    Components = "components",
    Objects = "objects",
    Arrays = "arrays",
    OneOfs = "oneOfs",
    AllOfs = "allOfs",
    AnyOfs = "anyOfs",
    Nots = "nots",
    PropertyNames = "propertyNames",
    PatternProperties = "patternProperties",
    Contains = "contains",
    Ifs = "ifs",
    Thenes = "thenes",
    Elses = "elses",
    Dependencies = "dependencies",
    Definitions = "definitions"
}
export type TraverseOptions = {
    callback: TraverseCallback;
    schemaTypesToIterate: Array<`${SchemaTypesToIterate}`>;
    seenSchemas: Set<any>;
};
export type TraverseCallback = (schema: SchemaInterface, propOrIndex: string | number | null, callbackType: SchemaIteratorCallbackType) => boolean | void;
/**
 * Go through each channel and for each parameter, and message payload and headers recursively call the callback for each schema.
 */
export declare function traverseAsyncApiDocument(doc: AsyncAPIDocumentInterface, callback: TraverseCallback, schemaTypesToIterate?: Array<`${SchemaTypesToIterate}`>): void;
