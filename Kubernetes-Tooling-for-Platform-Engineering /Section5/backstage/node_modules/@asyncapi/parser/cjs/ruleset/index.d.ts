import type { Parser } from '../parser';
import type { RulesetDefinition } from '@stoplight/spectral-core';
export type RulesetOptions = RulesetDefinition & {
    core?: boolean;
    recommended?: boolean;
} | RulesetDefinition | {
    core?: boolean;
    recommended?: boolean;
};
export declare function createRuleset(parser: Parser, options?: RulesetOptions): RulesetDefinition;
