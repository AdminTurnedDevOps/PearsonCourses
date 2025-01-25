"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const Compilation = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/Compilation'));
const tapable_1 = require("tapable");
/** @type {WeakMap<import("webpack").Compilation, CompilationHooks>} */
const compilationHooksMap = new WeakMap();
const PLUGIN_NAME = 'FederationModulesPlugin';
class FederationModulesPlugin {
    /**
     * @param {Compilation} compilation the compilation
     * @returns {CompilationHooks} the attached hooks
     */
    static getCompilationHooks(compilation) {
        if (!(compilation instanceof Compilation)) {
            throw new TypeError("The 'compilation' argument must be an instance of Compilation");
        }
        let hooks = compilationHooksMap.get(compilation);
        if (hooks === undefined) {
            hooks = {
                addContainerEntryModule: new tapable_1.SyncHook(['dependency']),
                addFederationRuntimeModule: new tapable_1.SyncHook(['module']),
            };
            compilationHooksMap.set(compilation, hooks);
        }
        return hooks;
    }
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            //@ts-ignore
            const hooks = FederationModulesPlugin.getCompilationHooks(compilation);
        });
    }
}
exports.default = FederationModulesPlugin;
//# sourceMappingURL=FederationModulesPlugin.js.map