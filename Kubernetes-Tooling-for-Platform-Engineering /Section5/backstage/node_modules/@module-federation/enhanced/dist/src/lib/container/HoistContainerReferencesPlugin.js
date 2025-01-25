"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoistContainerReferences = void 0;
exports.getAllReferencedModules = getAllReferencedModules;
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const FederationModulesPlugin_1 = __importDefault(require("./runtime/FederationModulesPlugin"));
const { AsyncDependenciesBlock, ExternalModule } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const PLUGIN_NAME = 'HoistContainerReferences';
/**
 * This class is used to hoist container references in the code.
 */
class HoistContainerReferences {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            const logger = compilation.getLogger(PLUGIN_NAME);
            const hooks = FederationModulesPlugin_1.default.getCompilationHooks(compilation);
            const containerEntryDependencies = new Set();
            hooks.addContainerEntryModule.tap('HoistContainerReferences', (dep) => {
                containerEntryDependencies.add(dep);
            });
            hooks.addFederationRuntimeModule.tap('HoistContainerReferences', (dep) => {
                containerEntryDependencies.add(dep);
            });
            // Hook into the optimizeChunks phase
            compilation.hooks.optimizeChunks.tap({
                name: PLUGIN_NAME,
                // advanced stage is where SplitChunksPlugin runs.
                stage: 11, // advanced + 1
            }, (chunks) => {
                const runtimeChunks = this.getRuntimeChunks(compilation);
                this.hoistModulesInChunks(compilation, runtimeChunks, chunks, logger, containerEntryDependencies);
            });
        });
    }
    // Method to hoist modules in chunks
    hoistModulesInChunks(compilation, runtimeChunks, chunks, logger, containerEntryDependencies) {
        const { chunkGraph, moduleGraph } = compilation;
        // when runtimeChunk: single is set - ContainerPlugin will create a "partial" chunk we can use to
        // move modules into the runtime chunk
        for (const dep of containerEntryDependencies) {
            const containerEntryModule = moduleGraph.getModule(dep);
            if (!containerEntryModule)
                continue;
            const allReferencedModules = getAllReferencedModules(compilation, containerEntryModule, 'initial');
            const allRemoteReferences = getAllReferencedModules(compilation, containerEntryModule, 'external');
            for (const remote of allRemoteReferences) {
                allReferencedModules.add(remote);
            }
            const containerRuntimes = chunkGraph.getModuleRuntimes(containerEntryModule);
            const runtimes = new Set();
            for (const runtimeSpec of containerRuntimes) {
                compilation.compiler.webpack.util.runtime.forEachRuntime(runtimeSpec, (runtimeKey) => {
                    if (runtimeKey) {
                        runtimes.add(runtimeKey);
                    }
                });
            }
            for (const runtime of runtimes) {
                const runtimeChunk = compilation.namedChunks.get(runtime);
                if (!runtimeChunk)
                    continue;
                for (const module of allReferencedModules) {
                    if (!chunkGraph.isModuleInChunk(module, runtimeChunk)) {
                        chunkGraph.connectChunkAndModule(runtimeChunk, module);
                    }
                }
            }
            this.cleanUpChunks(compilation, allReferencedModules);
        }
    }
    // Method to clean up chunks by disconnecting unused modules
    cleanUpChunks(compilation, modules) {
        const { chunkGraph } = compilation;
        for (const module of modules) {
            for (const chunk of chunkGraph.getModuleChunks(module)) {
                if (!chunk.hasRuntime()) {
                    chunkGraph.disconnectChunkAndModule(chunk, module);
                    if (chunkGraph.getNumberOfChunkModules(chunk) === 0 &&
                        chunkGraph.getNumberOfEntryModules(chunk) === 0) {
                        chunkGraph.disconnectChunk(chunk);
                        compilation.chunks.delete(chunk);
                        if (chunk.name) {
                            compilation.namedChunks.delete(chunk.name);
                        }
                    }
                }
            }
        }
        modules.clear();
    }
    // Helper method to get runtime chunks from the compilation
    getRuntimeChunks(compilation) {
        const runtimeChunks = new Set();
        const entries = compilation.entrypoints;
        for (const entrypoint of entries.values()) {
            const runtimeChunk = entrypoint.getRuntimeChunk();
            if (runtimeChunk) {
                runtimeChunks.add(runtimeChunk);
            }
        }
        return runtimeChunks;
    }
}
exports.HoistContainerReferences = HoistContainerReferences;
// Helper method to collect all referenced modules recursively
function getAllReferencedModules(compilation, module, type) {
    const collectedModules = new Set([module]);
    const visitedModules = new WeakSet([module]);
    const stack = [module];
    while (stack.length > 0) {
        const currentModule = stack.pop();
        if (!currentModule)
            continue;
        const mgm = compilation.moduleGraph._getModuleGraphModule(currentModule);
        if (!mgm?.outgoingConnections)
            continue;
        for (const connection of mgm.outgoingConnections) {
            const connectedModule = connection.module;
            // Skip if module has already been visited
            if (!connectedModule || visitedModules.has(connectedModule)) {
                continue;
            }
            // Handle 'initial' type (skipping async blocks)
            if (type === 'initial') {
                const parentBlock = compilation.moduleGraph.getParentBlock(connection.dependency);
                if (parentBlock instanceof AsyncDependenciesBlock) {
                    continue;
                }
            }
            // Handle 'external' type (collecting only external modules)
            if (type === 'external') {
                if (connection.module instanceof ExternalModule) {
                    collectedModules.add(connectedModule);
                }
            }
            else {
                // Handle 'all' or unspecified types
                collectedModules.add(connectedModule);
            }
            // Add connected module to the stack and mark it as visited
            visitedModules.add(connectedModule);
            stack.push(connectedModule);
        }
    }
    return collectedModules;
}
exports.default = HoistContainerReferences;
//# sourceMappingURL=HoistContainerReferencesPlugin.js.map