"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const EmbedFederationRuntimeModule_1 = __importDefault(require("./EmbedFederationRuntimeModule"));
const FederationModulesPlugin_1 = __importDefault(require("./FederationModulesPlugin"));
const utils_1 = require("./utils");
const { RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const federationGlobal = (0, utils_1.getFederationGlobalScope)(RuntimeGlobals);
class EmbedFederationRuntimePlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('EmbedFederationRuntimePlugin', (compilation) => {
            const hooks = FederationModulesPlugin_1.default.getCompilationHooks(compilation);
            const containerEntrySet = new Set();
            hooks.addFederationRuntimeModule.tap('EmbedFederationRuntimePlugin', (dependency) => {
                containerEntrySet.add(dependency);
            });
            const handleRuntimeRequirements = (chunk, runtimeRequirements) => {
                if (chunk.id === 'build time chunk') {
                    return;
                }
                if (runtimeRequirements.has('embeddedFederationRuntime'))
                    return;
                if (!runtimeRequirements.has(federationGlobal)) {
                    return;
                }
                runtimeRequirements.add('embeddedFederationRuntime');
                const runtimeModule = new EmbedFederationRuntimeModule_1.default(containerEntrySet);
                compilation.addRuntimeModule(chunk, runtimeModule);
            };
            compilation.hooks.runtimeRequirementInTree
                .for(federationGlobal)
                .tap('EmbedFederationRuntimePlugin', handleRuntimeRequirements);
        });
    }
}
exports.default = EmbedFederationRuntimePlugin;
//# sourceMappingURL=EmbedFederationRuntimePlugin.js.map