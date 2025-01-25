import type { Format } from '@stoplight/spectral-core';
import type { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare const jsonSchema: Format<Record<string, unknown> & {
    $schema: string;
}>;
export declare const jsonSchemaLoose: Format<Record<string, unknown>>;
export declare const jsonSchemaDraft4: Format<JSONSchema4>;
export declare const jsonSchemaDraft6: Format<JSONSchema6>;
export declare const jsonSchemaDraft7: Format<JSONSchema7>;
export declare const jsonSchemaDraft2019_09: Format<Record<string, unknown>>;
export declare const jsonSchemaDraft2020_12: Format<Record<string, unknown>>;
export declare function extractDraftVersion($schema: string): string | null;
export declare function detectDialect(document: unknown): string | null;
