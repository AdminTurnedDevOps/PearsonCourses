import { Dictionary } from '@stoplight/types';
export declare type Transformer<V = Record<string, unknown>> = (this: V, ...args: unknown[]) => string;
export declare class Replacer<V extends Record<string, unknown>> {
    protected readonly regex: RegExp;
    protected readonly functions: Dictionary<Transformer<V>>;
    constructor(count: number);
    addFunction(name: string, filter: Transformer<V>): void;
    print(input: string, values: V): string;
}
