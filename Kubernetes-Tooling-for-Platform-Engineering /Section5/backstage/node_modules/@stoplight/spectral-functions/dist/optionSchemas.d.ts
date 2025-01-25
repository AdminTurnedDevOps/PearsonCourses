import type { createRulesetFunction } from '@stoplight/spectral-core';
declare type CustomFunctionOptionsSchema = Parameters<typeof createRulesetFunction>[0]['input'];
export declare const optionSchemas: Record<string, CustomFunctionOptionsSchema>;
export {};
