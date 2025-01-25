import type { Format } from '@stoplight/spectral-core';
export declare function getSchema(docFormats: Set<Format>, resolved: boolean): Record<string, any> | void;
export declare const documentStructure: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, {
    resolved: boolean;
}>;
