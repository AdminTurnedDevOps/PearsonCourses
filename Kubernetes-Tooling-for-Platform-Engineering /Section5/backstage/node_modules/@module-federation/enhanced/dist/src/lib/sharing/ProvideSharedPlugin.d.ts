import type { Compiler } from 'webpack';
import type { ProvideSharedPluginOptions, ProvidesConfig } from '../../declarations/plugins/sharing/ProvideSharedPlugin';
export type ProvideOptions = ProvidesConfig;
export type ResolvedProvideMap = Map<string, {
    config: ProvideOptions;
    version: string | undefined | false;
}>;
/**
 * @typedef {Object} ProvideOptions
 * @property {string} shareKey
 * @property {string} shareScope
 * @property {string | undefined | false} version
 * @property {boolean} eager
 */
/** @typedef {Map<string, { config: ProvideOptions, version: string | undefined | false }>} ResolvedProvideMap */
declare class ProvideSharedPlugin {
    private _provides;
    /**
     * @param {ProvideSharedPluginOptions} options options
     */
    constructor(options: ProvideSharedPluginOptions);
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
}
export default ProvideSharedPlugin;
