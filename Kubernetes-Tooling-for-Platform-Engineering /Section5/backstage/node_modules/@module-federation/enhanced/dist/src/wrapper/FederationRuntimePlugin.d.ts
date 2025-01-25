import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { moduleFederationPlugin } from '@module-federation/sdk';
export default class FederationRuntimePlugin implements WebpackPluginInstance {
    private _options?;
    name: string;
    entryFilePath: string;
    constructor(options?: moduleFederationPlugin.ModuleFederationPluginOptions);
    apply(compiler: Compiler): void;
}
