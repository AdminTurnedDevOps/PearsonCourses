import { StatsExpose, StatsRemote, StatsShared, moduleFederationPlugin } from '@module-federation/sdk';
import type { StatsModule } from 'webpack';
declare class ModuleHandler {
    private _options;
    private _bundler;
    private _modules;
    private _remoteManager;
    private _sharedManager;
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions, modules: StatsModule[], { bundler }: {
        bundler: 'webpack' | 'rspack';
    });
    get isRspack(): boolean;
    private _handleSharedModule;
    private _handleRemoteModule;
    private _handleContainerModule;
    collect(): {
        remotes: StatsRemote[];
        exposesMap: {
            [exposeImportValue: string]: StatsExpose;
        };
        sharedMap: {
            [sharedKey: string]: StatsShared;
        };
    };
}
export { ModuleHandler };
