import { Rule, StringifiedRule } from './rule';
import type { FileRulesetSeverityDefinition, ParserOptions, RulesetAliasesDefinition, RulesetDefinition, RulesetOverridesDefinition, Stringifable } from './types';
import { Formats } from './formats';
import type { Stringified } from './types';
declare const STACK_SYMBOL: unique symbol;
declare const EXPLICIT_SEVERITY: unique symbol;
declare type RulesetContext = {
    readonly severity?: FileRulesetSeverityDefinition;
    readonly source?: string;
    readonly [STACK_SYMBOL]?: Map<RulesetDefinition, Ruleset>;
    readonly [EXPLICIT_SEVERITY]?: boolean;
};
declare type RulesetJson = {
    id: number;
    extends: RulesetJson[] | null;
    source: string | null;
    aliases: RulesetAliasesDefinition | null;
    formats: Formats | null;
    rules: Record<string, StringifiedRule>;
    overrides: RulesetOverridesDefinition | null;
    parserOptions: ParserOptions;
};
export declare type StringifiedRuleset = Stringified<RulesetJson>;
export declare class Ruleset {
    #private;
    readonly maybeDefinition: unknown;
    readonly id: number;
    protected readonly extends: Ruleset[] | null;
    readonly formats: Formats<import("./format").Format<void>>;
    readonly overrides: RulesetOverridesDefinition | null;
    readonly aliases: RulesetAliasesDefinition | null;
    readonly hasComplexAliases: boolean;
    readonly rules: Record<string, Rule>;
    readonly definition: RulesetDefinition;
    constructor(maybeDefinition: unknown, context?: RulesetContext);
    get source(): string | null;
    fromSource(source: string | null): Ruleset;
    get parserOptions(): ParserOptions;
    static isDefaultRulesetFile(uri: string): boolean;
    toJSON(): Stringifable<RulesetJson>;
}
export {};
