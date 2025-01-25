"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const compileBooleanMatcher = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/compileBooleanMatcher'));
const { getUndoPath } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/identifier'));
// inspired by react-refresh-webpack-plugin
const getFederationGlobal_1 = __importDefault(require("./getFederationGlobal"));
const { RuntimeModule, RuntimeGlobals, Template } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class FederationRuntimeModule extends RuntimeModule {
    constructor(runtimeRequirements, containerName, initOptionsWithoutShared) {
        super('federation runtime', RuntimeModule.STAGE_NORMAL - 1);
        this.runtimeRequirements = runtimeRequirements;
        this.containerName = containerName;
        this.initOptionsWithoutShared = initOptionsWithoutShared;
    }
    /**
     * @returns {string | null} runtime code
     */
    generate() {
        let matcher = false;
        let rootOutputDir;
        if (this.compilation && this.chunk) {
            const jsModulePlugin = this.compilation.compiler.webpack?.javascript
                ?.JavascriptModulesPlugin ||
                require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/javascript/JavascriptModulesPlugin'));
            const { chunkHasJs } = jsModulePlugin;
            if (this.runtimeRequirements.has(RuntimeGlobals.ensureChunkHandlers)) {
                const conditionMap = this.compilation.chunkGraph.getChunkConditionMap(this.chunk, chunkHasJs);
                const hasJsMatcher = compileBooleanMatcher(conditionMap);
                if (typeof hasJsMatcher === 'boolean') {
                    matcher = hasJsMatcher;
                }
                else {
                    matcher = hasJsMatcher('chunkId');
                }
                const outputName = this.compilation.getPath(jsModulePlugin.getChunkFilenameTemplate(this.chunk, this.compilation.outputOptions), { chunk: this.chunk, contentHashType: 'javascript' });
                rootOutputDir = getUndoPath(outputName, this.compilation.outputOptions.path || '', false);
            }
        }
        return Template.asString([
            (0, getFederationGlobal_1.default)(Template, RuntimeGlobals, matcher, rootOutputDir, this.initOptionsWithoutShared),
        ]);
    }
}
exports.default = FederationRuntimeModule;
//# sourceMappingURL=FederationRuntimeModule.js.map