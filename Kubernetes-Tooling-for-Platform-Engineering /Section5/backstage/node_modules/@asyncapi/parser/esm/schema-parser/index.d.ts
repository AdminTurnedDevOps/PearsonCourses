import type { Parser } from '../parser';
import type { AsyncAPISchema, DetailedAsyncAPI, SchemaValidateResult } from '../types';
export interface ValidateSchemaInput<D = unknown, M = unknown> {
    readonly asyncapi: DetailedAsyncAPI;
    readonly data: D;
    readonly meta: M;
    readonly path: Array<string | number>;
    readonly schemaFormat: string;
    readonly defaultSchemaFormat: string;
}
export interface ParseSchemaInput<D = unknown, M = unknown> {
    readonly asyncapi: DetailedAsyncAPI;
    readonly data: D;
    readonly meta: M;
    readonly path: Array<string | number>;
    readonly schemaFormat: string;
    readonly defaultSchemaFormat: string;
}
export interface SchemaParser<D = unknown, M = unknown> {
    validate: (input: ValidateSchemaInput<D, M>) => void | SchemaValidateResult[] | Promise<void | SchemaValidateResult[]>;
    parse: (input: ParseSchemaInput<D, M>) => AsyncAPISchema | Promise<AsyncAPISchema>;
    getMimeTypes: () => Array<string>;
}
export declare function validateSchema(parser: Parser, input: ValidateSchemaInput): Promise<void | import("@stoplight/spectral-core").IFunctionResult[]>;
export declare function parseSchema(parser: Parser, input: ParseSchemaInput): Promise<AsyncAPISchema>;
export declare function registerSchemaParser(parser: Parser, schemaParser: SchemaParser): void;
export declare function getSchemaFormat(schematFormat: string | undefined, asyncapiVersion: string): string;
export declare function getDefaultSchemaFormat(asyncapiVersion: string): string;
