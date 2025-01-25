import type { Compiler } from 'webpack';
import { moduleFederationPlugin } from '@module-federation/sdk';
import FederationRuntimeDependency from './FederationRuntimeDependency';
declare class FederationRuntimePlugin {
    options?: moduleFederationPlugin.ModuleFederationPluginOptions;
    entryFilePath: string;
    bundlerRuntimePath: string;
    federationRuntimeDependency?: FederationRuntimeDependency;
    constructor(options?: moduleFederationPlugin.ModuleFederationPluginOptions);
    static getTemplate(compiler: Compiler, options: moduleFederationPlugin.ModuleFederationPluginOptions, bundlerRuntimePath?: string, experiments?: moduleFederationPlugin.ModuleFederationPluginOptions['experiments']): string;
    static getFilePath(compiler: Compiler, options: moduleFederationPlugin.ModuleFederationPluginOptions, bundlerRuntimePath?: string, experiments?: moduleFederationPlugin.ModuleFederationPluginOptions['experiments']): string;
    getFilePath(compiler: Compiler): string;
    ensureFile(compiler: Compiler): void;
    getDependency(compiler: Compiler): FederationRuntimeDependency;
    prependEntry(compiler: Compiler): void;
    injectRuntime(compiler: Compiler): void;
    setRuntimeAlias(compiler: Compiler): void;
    apply(compiler: Compiler): void;
}
export default FederationRuntimePlugin;
