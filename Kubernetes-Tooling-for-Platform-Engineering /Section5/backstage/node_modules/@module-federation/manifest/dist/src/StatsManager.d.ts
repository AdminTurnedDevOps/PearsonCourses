import { StatsBuildInfo, moduleFederationPlugin } from '@module-federation/sdk';
import { Compilation, Compiler } from 'webpack';
import { StatsInfo } from './types';
declare class StatsManager {
    private _options;
    private _publicPath?;
    private _pluginVersion?;
    private _bundler;
    private _containerManager;
    private _remoteManager;
    private _sharedManager;
    private _pkgJsonManager;
    get buildInfo(): StatsBuildInfo;
    get fileName(): string;
    private _getMetaData;
    private _getFilteredModules;
    private _getModuleAssets;
    private _getProvideSharedAssets;
    private _generateStats;
    getPublicPath(compiler: Compiler): string;
    init(options: moduleFederationPlugin.ModuleFederationPluginOptions, { pluginVersion, bundler, }: {
        pluginVersion: string;
        bundler: 'webpack' | 'rspack';
    }): void;
    generateStats(compiler: Compiler, compilation: Compilation, extraOptions?: {
        disableEmit?: boolean;
    }): Promise<StatsInfo>;
    validate(compiler: Compiler): boolean;
}
export { StatsManager };
