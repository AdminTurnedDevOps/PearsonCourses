import { schema as schemaFn } from '@stoplight/spectral-functions';
import type { JsonPath } from '@stoplight/types';
import type { RulesetFunctionContext } from '@stoplight/spectral-core';
import type { v2 } from 'spec-types';
export declare function getMessageExamples(message: v2.MessageObject): Array<{
    path: JsonPath;
    value: v2.MessageExampleObject;
}>;
export declare function validate(value: unknown, path: JsonPath, type: 'payload' | 'headers', schema: unknown, ctx: RulesetFunctionContext): ReturnType<typeof schemaFn>;
export declare const messageExamples: import("@stoplight/spectral-core").RulesetFunctionWithValidator<v2.MessageObject, null>;
