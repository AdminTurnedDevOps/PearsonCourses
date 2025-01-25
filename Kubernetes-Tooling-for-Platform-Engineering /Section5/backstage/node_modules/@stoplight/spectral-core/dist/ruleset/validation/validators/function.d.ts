import type { RulesetFunction, RulesetFunctionWithValidator } from '../../../types';
export declare function validateFunction(fn: unknown | RulesetFunction | RulesetFunctionWithValidator, opts: unknown, path: string): Error | void;
