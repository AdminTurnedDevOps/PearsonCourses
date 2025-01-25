import { RemoteEntryInfo, StatsRemote, containerReferencePlugin, moduleFederationPlugin } from '@module-federation/sdk';
import { BasicPluginOptionsManager } from './BasicPluginOptionsManager';
interface NormalizedRemote {
    [remoteName: string]: RemoteEntryInfo & {
        alias: string;
        shareScope: string;
    };
}
declare class RemoteManager extends BasicPluginOptionsManager<moduleFederationPlugin.ModuleFederationPluginOptions> {
    normalizedOptions: NormalizedRemote;
    get enable(): boolean;
    get statsRemoteWithEmptyUsedIn(): StatsRemote[];
    get dtsRemotes(): Record<string, string>;
    get remotes(): moduleFederationPlugin.ModuleFederationPluginOptions['remotes'];
    normalizeOptions(options?: containerReferencePlugin.ContainerReferencePluginOptions['remotes']): void;
    init(options: moduleFederationPlugin.ModuleFederationPluginOptions): void;
}
export { RemoteManager };
