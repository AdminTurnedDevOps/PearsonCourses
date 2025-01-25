import { WebpackPluginInstance, Compiler } from 'webpack';
import { moduleFederationPlugin } from '@module-federation/sdk';

declare class DtsPlugin implements WebpackPluginInstance {
    options: moduleFederationPlugin.ModuleFederationPluginOptions;
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions);
    apply(compiler: Compiler): void;
}

export { DtsPlugin };
