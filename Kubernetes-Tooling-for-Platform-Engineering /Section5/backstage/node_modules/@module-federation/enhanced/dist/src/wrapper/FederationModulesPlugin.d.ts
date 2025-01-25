import type { WebpackPluginInstance, Compiler, Compilation } from 'webpack';
export default class FederationModulesPlugin implements WebpackPluginInstance {
    name: string;
    constructor();
    static getCompilationHooks(compilation: Compilation): {
        addContainerEntryModule: import("tapable").SyncHook<[import("../lib/container/ContainerEntryDependency").default], void>;
        addFederationRuntimeModule: import("tapable").SyncHook<[import("../lib/container/runtime/FederationRuntimeDependency").default], void>;
    };
    apply(compiler: Compiler): void;
}
