import { Optional } from '@stoplight/types';
import { Rule } from '../rule';
import type { Ruleset } from '../ruleset';
import { FileRuleDefinition } from '../types';
export declare function mergeRule(existingRule: Optional<Rule>, name: string, rule: FileRuleDefinition, ruleset: Ruleset): Rule;
