import { type moduleFederationPlugin } from '@module-federation/sdk';
import type { Compiler, WebpackPluginInstance } from 'webpack';
declare class ModuleFederationPlugin implements WebpackPluginInstance {
    private _options;
    private _statsPlugin?;
    /**
     * @param {moduleFederationPlugin.ModuleFederationPluginOptions} options options
     */
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions);
    private _patchBundlerConfig;
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
    get statsResourceInfo(): Partial<import("@module-federation/manifest").ResourceInfo> | undefined;
}
export default ModuleFederationPlugin;
