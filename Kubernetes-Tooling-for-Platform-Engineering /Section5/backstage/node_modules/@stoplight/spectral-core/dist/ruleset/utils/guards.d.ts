import type { RulesetScopedAliasDefinition } from '../types';
export declare function isSimpleAliasDefinition(alias: unknown): alias is string[];
export declare function isValidAliasTarget(target: Record<string, unknown>): target is RulesetScopedAliasDefinition['targets'][number];
export declare function isScopedAliasDefinition(alias: unknown): alias is RulesetScopedAliasDefinition;
