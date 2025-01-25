'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const StartupHelpers_1 = require("./StartupHelpers");
const ContainerEntryModule_1 = __importDefault(require("../container/ContainerEntryModule"));
const { RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const StartupEntrypointRuntimeModule = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/runtime/StartupEntrypointRuntimeModule'));
class StartupChunkDependenciesPlugin {
    constructor(options) {
        this.asyncChunkLoading = options.asyncChunkLoading ?? true;
    }
    isEnabledForChunk(chunk, compilation) {
        if (chunk.id === 'build time chunk')
            return false;
        const [finalEntry] = Array.from(compilation.chunkGraph.getChunkEntryModulesIterable(chunk)).reverse() || [];
        return !(finalEntry instanceof ContainerEntryModule_1.default);
    }
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('MfStartupChunkDependenciesPlugin', (compilation) => {
            const isEnabledForChunk = (chunk) => this.isEnabledForChunk(chunk, compilation);
            compilation.hooks.additionalTreeRuntimeRequirements.tap('StartupChunkDependenciesPlugin', (chunk, set, { chunkGraph }) => {
                if (!isEnabledForChunk(chunk))
                    return;
                if (chunk.hasRuntime()) {
                    set.add(RuntimeGlobals.startupEntrypoint);
                    set.add(RuntimeGlobals.ensureChunk);
                    set.add(RuntimeGlobals.ensureChunkIncludeEntries);
                }
            });
            compilation.hooks.additionalChunkRuntimeRequirements.tap('MfStartupChunkDependenciesPlugin', (chunk, set, { chunkGraph }) => {
                if (!isEnabledForChunk(chunk))
                    return;
                if (chunkGraph.getNumberOfEntryModules(chunk) === 0)
                    return;
                set.add(StartupHelpers_1.federationStartup);
            });
            compilation.hooks.runtimeRequirementInTree
                .for(RuntimeGlobals.startupEntrypoint)
                .tap('StartupChunkDependenciesPlugin', (chunk, set, { chunkGraph }) => {
                if (!isEnabledForChunk(chunk))
                    return;
                set.add(RuntimeGlobals.require);
                set.add(RuntimeGlobals.ensureChunk);
                set.add(RuntimeGlobals.ensureChunkIncludeEntries);
                compilation.addRuntimeModule(chunk, new StartupEntrypointRuntimeModule(this.asyncChunkLoading));
            });
            const { renderStartup } = compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation);
            renderStartup.tap('MfStartupChunkDependenciesPlugin', (startupSource, lastInlinedModule, renderContext) => {
                const { chunk, chunkGraph, runtimeTemplate } = renderContext;
                if (!isEnabledForChunk(chunk)) {
                    return startupSource;
                }
                const treeRuntimeRequirements = chunkGraph.getTreeRuntimeRequirements(chunk);
                const chunkRuntimeRequirements = chunkGraph.getChunkRuntimeRequirements(chunk);
                const federation = chunkRuntimeRequirements.has(StartupHelpers_1.federationStartup) ||
                    treeRuntimeRequirements.has(StartupHelpers_1.federationStartup);
                if (!federation) {
                    return startupSource;
                }
                const entryModules = Array.from(chunkGraph.getChunkEntryModulesWithChunkGroupIterable(chunk));
                const entryGeneration = runtimeTemplate.outputOptions.module
                    ? StartupHelpers_1.generateESMEntryStartup
                    : StartupHelpers_1.generateEntryStartup;
                return new compiler.webpack.sources.ConcatSource(entryGeneration(compilation, chunkGraph, runtimeTemplate, entryModules, chunk, false));
            });
        });
    }
}
exports.default = StartupChunkDependenciesPlugin;
//# sourceMappingURL=MfStartupChunkDependenciesPlugin.js.map