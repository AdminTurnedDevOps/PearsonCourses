import { moduleFederationPlugin } from '@module-federation/sdk';

declare class ReactBridgeAliasChangerPlugin {
    alias: string;
    targetFile: string;
    moduleFederationOptions: moduleFederationPlugin.ModuleFederationPluginOptions;
    constructor(info: {
        moduleFederationOptions: moduleFederationPlugin.ModuleFederationPluginOptions;
    });
    apply(compiler: any): void;
}
export default ReactBridgeAliasChangerPlugin;

export { }
