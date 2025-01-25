import { DiagnosticSeverity, JsonPath, Optional } from '@stoplight/types';
import { Ruleset } from './ruleset';
import { Format } from './format';
import type { HumanReadableDiagnosticSeverity, IRuleThen, RuleDefinition, Stringifable } from './types';
import { Formats } from './formats';
import type { Stringified, FileRulesetSeverityDefinition } from './types';
export interface IRule {
    description: string | null;
    message: string | null;
    severity: DiagnosticSeverity;
    resolved: boolean;
    formats: Formats | null;
    enabled: boolean;
    recommended: boolean;
    documentationUrl: string | null;
    then: IRuleThen[];
    given: string[];
    extensions: Record<string, unknown> | null;
}
declare type RuleJson = Omit<IRule, 'then'> & {
    name: string;
    then: (Omit<IRuleThen, 'function'> & {
        function: string;
    })[];
    owner: number;
};
export declare type StringifiedRule = Stringified<RuleJson>;
export declare class Rule implements IRule {
    #private;
    readonly name: string;
    readonly definition: RuleDefinition;
    readonly owner: Ruleset;
    description: string | null;
    message: string | null;
    resolved: boolean;
    formats: Formats | null;
    recommended: boolean;
    documentationUrl: string | null;
    extensions: Record<string, unknown> | null;
    constructor(name: string, definition: RuleDefinition, owner: Ruleset);
    overrides?: {
        rulesetSource: string;
        definition: Map<string, Map<string, DiagnosticSeverity | -1>>;
    };
    get enabled(): boolean;
    set enabled(enabled: boolean);
    static isEnabled(rule: IRule, severity: FileRulesetSeverityDefinition): boolean;
    getSeverityForSource(source: string, path: JsonPath): DiagnosticSeverity | -1;
    get severity(): DiagnosticSeverity;
    set severity(severity: Optional<HumanReadableDiagnosticSeverity | DiagnosticSeverity>);
    get then(): IRuleThen[];
    set then(then: RuleDefinition['then']);
    get given(): string[];
    set given(given: RuleDefinition['given']);
    getGivenForFormats(formats: Set<Format> | null): string[];
    matchesFormat(formats: Set<Format> | null): boolean;
    clone(): Rule;
    toJSON(): Stringifable<RuleJson>;
}
export {};
