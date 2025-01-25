import type { Compilation } from 'webpack';
interface MatchedConfigs<T> {
    resolved: Map<string, T>;
    unresolved: Map<string, T>;
    prefixed: Map<string, T>;
}
export declare function resolveMatchedConfigs<T>(compilation: Compilation, configs: [string, T][]): Promise<MatchedConfigs<T>>;
export {};
