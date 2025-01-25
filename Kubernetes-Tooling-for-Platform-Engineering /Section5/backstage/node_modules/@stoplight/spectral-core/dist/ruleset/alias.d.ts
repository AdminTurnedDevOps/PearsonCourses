import type { RulesetScopedAliasDefinition } from './types';
export declare function resolveAliasForFormats({ targets }: RulesetScopedAliasDefinition, formats: Set<unknown> | null): string[] | null;
export declare function resolveAlias(aliases: Record<string, unknown> | null, expression: string, formats: Set<unknown> | null): string[];
