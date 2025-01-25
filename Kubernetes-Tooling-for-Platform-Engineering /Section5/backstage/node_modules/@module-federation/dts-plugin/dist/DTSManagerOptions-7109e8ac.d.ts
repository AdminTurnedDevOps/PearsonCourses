import { moduleFederationPlugin } from '@module-federation/sdk';

interface RemoteOptions extends moduleFederationPlugin.DtsRemoteOptions {
    moduleFederationConfig: moduleFederationPlugin.ModuleFederationPluginOptions;
    context?: string;
    implementation?: string;
    hostRemoteTypesFolder?: string;
}

interface HostOptions extends moduleFederationPlugin.DtsHostOptions {
    moduleFederationConfig: moduleFederationPlugin.ModuleFederationPluginOptions;
    context?: string;
    implementation?: string;
    runtimePkgs?: string[];
}
interface RemoteInfo {
    name: string;
    url: string;
    alias: string;
    zipUrl?: string;
    apiTypeUrl?: string;
}

interface DTSManagerOptions {
    remote?: RemoteOptions;
    host?: HostOptions;
    extraOptions?: Record<string, any>;
}

export { DTSManagerOptions as D, HostOptions as H, RemoteInfo as R, RemoteOptions as a };
