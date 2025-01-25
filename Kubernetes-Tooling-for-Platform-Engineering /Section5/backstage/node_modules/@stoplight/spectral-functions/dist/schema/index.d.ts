import type { ErrorObject } from 'ajv';
import { JSONSchema } from '@stoplight/spectral-core';
export declare type Options = {
    schema: Record<string, unknown> | JSONSchema;
    allErrors?: boolean;
    dialect?: 'auto' | 'draft4' | 'draft6' | 'draft7' | 'draft2019-09' | 'draft2020-12';
    prepareResults?(errors: ErrorObject[]): void;
};
declare const _default: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, Options>;
export default _default;
