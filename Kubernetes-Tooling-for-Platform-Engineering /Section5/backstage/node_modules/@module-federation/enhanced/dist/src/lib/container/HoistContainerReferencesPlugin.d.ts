import type { Compiler, Compilation, WebpackPluginInstance, Module } from 'webpack';
/**
 * This class is used to hoist container references in the code.
 */
export declare class HoistContainerReferences implements WebpackPluginInstance {
    apply(compiler: Compiler): void;
    private hoistModulesInChunks;
    private cleanUpChunks;
    private getRuntimeChunks;
}
export declare function getAllReferencedModules(compilation: Compilation, module: Module, type?: 'all' | 'initial' | 'external'): Set<Module>;
export default HoistContainerReferences;
