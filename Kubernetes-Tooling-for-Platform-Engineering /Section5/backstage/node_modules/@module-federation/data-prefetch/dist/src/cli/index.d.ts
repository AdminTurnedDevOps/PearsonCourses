import { moduleFederationPlugin } from '@module-federation/sdk';
import type { Compiler, WebpackPluginInstance } from 'webpack';
declare const RuntimeGlobals: typeof import("webpack").RuntimeGlobals;
export declare function getFederationGlobalScope(runtimeGlobals: typeof RuntimeGlobals): string;
export declare class PrefetchPlugin implements WebpackPluginInstance {
    options: moduleFederationPlugin.ModuleFederationPluginOptions;
    private _reWriteExports;
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions);
    apply(compiler: Compiler): void;
    static addRuntime(compiler: Compiler, options: {
        name: string;
    }): string;
    static setRemoteIdentifier(): string;
    static removeRemoteIdentifier(): string;
}
export {};
