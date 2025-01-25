import type { IGivenNode } from '../types';
import type { IRunnerInternalContext } from './types';
import type { Rule } from '../ruleset/rule';
export declare const lintNode: (context: IRunnerInternalContext, node: IGivenNode, rule: Rule) => void;
