import { ErrorObject } from 'ajv';
import { RulesetValidationError } from './validation/index';
import { JSONSchema, RulesetFunction, RulesetFunctionWithValidator } from '../types';
export declare class RulesetFunctionValidationError extends RulesetValidationError {
    constructor(fn: string, error: ErrorObject);
    private static getPath;
    private static printMessage;
}
declare type SchemaKeyedFragmentKeyword = 'properties' | 'patternProperties' | 'definitions';
declare type SchemaFragmentKeyword = 'additionalItems' | 'propertyNames' | 'if' | 'then' | 'else' | 'not';
declare type SchemaCompoundKeyword = 'allOf' | 'anyOf' | 'oneOf';
declare type Schema = ((Omit<JSONSchema, SchemaKeyedFragmentKeyword | SchemaFragmentKeyword | SchemaCompoundKeyword | 'items' | 'dependencies'> & {
    'x-internal'?: boolean;
    errorMessage?: string | {
        [key in keyof JSONSchema]: string;
    };
}) | {
    'x-internal': boolean;
}) & {
    [key in SchemaKeyedFragmentKeyword]?: {
        [key: string]: SchemaDefinition;
    };
} & {
    [key in SchemaFragmentKeyword]?: SchemaDefinition;
} & {
    [key in SchemaCompoundKeyword]?: SchemaDefinition[];
} & {
    items?: SchemaDefinition | SchemaDefinition[];
    dependencies?: SchemaDefinition | string[];
};
export declare type SchemaDefinition = Schema | boolean;
export declare function createRulesetFunction<I, O>({ input, errorOnInvalidInput, options, }: {
    input: Schema | null;
    errorOnInvalidInput?: boolean;
    options: Schema | null;
}, fn: RulesetFunction<I, O>): RulesetFunctionWithValidator<I, O>;
export {};
