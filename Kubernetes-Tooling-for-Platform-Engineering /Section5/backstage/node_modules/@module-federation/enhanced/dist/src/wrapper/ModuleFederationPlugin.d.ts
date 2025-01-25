import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { moduleFederationPlugin } from '@module-federation/sdk';
import type { ResourceInfo } from '@module-federation/manifest';
export default class ModuleFederationPlugin implements WebpackPluginInstance {
    private _options;
    private _mfPlugin?;
    name: string;
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions);
    apply(compiler: Compiler): void;
    get statsResourceInfo(): Partial<ResourceInfo> | undefined;
}
