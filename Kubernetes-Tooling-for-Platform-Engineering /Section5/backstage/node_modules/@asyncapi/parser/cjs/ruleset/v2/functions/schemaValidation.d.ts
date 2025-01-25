type SchemaFragment = {
    default?: unknown;
    examples?: unknown[];
};
export declare const schemaValidation: import("@stoplight/spectral-core").RulesetFunctionWithValidator<SchemaFragment, {
    type: 'default' | 'examples';
}>;
export {};
