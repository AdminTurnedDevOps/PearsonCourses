import { Compiler, WebpackPluginInstance } from 'webpack';
import { moduleFederationPlugin } from '@module-federation/sdk';
import { StatsInfo, ManifestInfo, ResourceInfo } from './types';
export declare class StatsPlugin implements WebpackPluginInstance {
    readonly name = "StatsPlugin";
    private _options;
    private _statsManager;
    private _manifestManager;
    private _enable;
    private _bundler;
    statsInfo?: StatsInfo;
    manifestInfo?: ManifestInfo;
    disableEmit?: boolean;
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions, { pluginVersion, bundler, }: {
        pluginVersion: string;
        bundler: 'webpack' | 'rspack';
    });
    apply(compiler: Compiler): void;
    get resourceInfo(): Partial<ResourceInfo>;
}
