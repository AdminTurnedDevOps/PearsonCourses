import { RulesetDefinition, RulesetOverrideDefinition } from '../types';
declare type MergeableRuleset = Omit<RulesetDefinition, 'overrides'> | RulesetOverrideDefinition;
export declare function mergeRulesets(left: MergeableRuleset, right: MergeableRuleset, isOverride: boolean): RulesetDefinition;
export {};
