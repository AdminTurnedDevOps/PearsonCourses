import type { DiagnosticSeverity } from '@stoplight/types';
import type { Format } from './format';
import type { RulesetFunction, RulesetFunctionWithValidator } from '../types';
import type { Formats } from './formats';
export declare type HumanReadableDiagnosticSeverity = 'error' | 'warn' | 'info' | 'hint' | 'off';
export declare type FileRuleSeverityDefinition = DiagnosticSeverity | HumanReadableDiagnosticSeverity | boolean;
export declare type FileRulesetSeverityDefinition = 'off' | 'recommended' | 'all';
export declare type FileRuleDefinition = RuleDefinition | FileRuleSeverityDefinition;
export declare type ParserOptions = {
    duplicateKeys: DiagnosticSeverity | HumanReadableDiagnosticSeverity;
    incompatibleValues: DiagnosticSeverity | HumanReadableDiagnosticSeverity;
};
export declare type RuleDefinition = {
    type?: 'validation' | 'style';
    formats?: Formats | Format[];
    documentationUrl?: string;
    message?: string;
    description?: string;
    severity?: DiagnosticSeverity | HumanReadableDiagnosticSeverity;
    recommended?: boolean;
    given: GivenDefinition;
    resolved?: boolean;
    then: IRuleThen | IRuleThen[];
    extensions?: Record<string, unknown>;
};
export interface IRuleThen {
    field?: string;
    function: RulesetFunction<any, any> | RulesetFunctionWithValidator<any, any>;
    functionOptions?: unknown;
}
export declare type GivenDefinition = string | string[];
export declare type RulesetExtendsDefinition = RulesetDefinition | (RulesetDefinition | [RulesetDefinition, FileRulesetSeverityDefinition])[];
export declare type RulesetOverrideDefinition = Pick<RulesetDefinition, 'formats' | 'parserOptions' | 'aliases'> & ({
    extends: RulesetExtendsDefinition;
} | {
    rules: Record<string, Readonly<FileRuleDefinition>>;
} | {
    extends: RulesetExtendsDefinition;
    rules: Record<string, Readonly<FileRuleDefinition>>;
});
export declare type RulesetOverridesDefinition = ReadonlyArray<{
    files: string[];
} & RulesetOverrideDefinition>;
export declare type RulesetScopedAliasDefinition = {
    description?: string;
    targets: {
        formats: Formats | Format[];
        given: string[];
    }[];
};
export declare type RulesetAliasesDefinition = Record<string, string[] | RulesetScopedAliasDefinition>;
export declare type RulesetDefinition = Readonly<{
    documentationUrl?: string;
    description?: string;
    formats?: Formats | Format[];
    parserOptions?: Partial<ParserOptions>;
    overrides?: RulesetOverridesDefinition;
    aliases?: RulesetAliasesDefinition;
} & Readonly<{
    overrides: RulesetOverridesDefinition;
} | {
    extends: RulesetExtendsDefinition;
} | {
    rules: Record<string, Readonly<RuleDefinition>>;
} | {
    extends: RulesetExtendsDefinition;
    rules: Record<string, Readonly<FileRuleDefinition>>;
}>>;
export declare type Stringifable<T> = T extends object ? {
    [P in keyof T]: Stringifable<T[P]> | {
        toJSON?(): Stringifable<T[P]>;
    };
} : T;
export declare type Stringified<T> = T extends object ? {
    [P in keyof T]: NonNullable<T[P]> extends {
        toJSON(): infer R;
    } ? R : Stringified<T[P]>;
} : T;
