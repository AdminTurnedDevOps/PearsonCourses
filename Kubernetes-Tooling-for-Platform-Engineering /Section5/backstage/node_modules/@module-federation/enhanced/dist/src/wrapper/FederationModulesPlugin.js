"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const PLUGIN_NAME = 'FederationModulesPlugin';
class FederationModulesPlugin {
    constructor() {
        this.name = PLUGIN_NAME;
    }
    static getCompilationHooks(compilation) {
        const CoreFederationModulesPlugin = require('../lib/container/runtime/FederationModulesPlugin')
            .default;
        return CoreFederationModulesPlugin.getCompilationHooks(compilation);
    }
    apply(compiler) {
        process.env['FEDERATION_WEBPACK_PATH'] =
            process.env['FEDERATION_WEBPACK_PATH'] || (0, normalize_webpack_path_1.getWebpackPath)(compiler);
        const CoreFederationModulesPlugin = require('../lib/container/runtime/FederationModulesPlugin')
            .default;
        new CoreFederationModulesPlugin().apply(compiler);
    }
}
exports.default = FederationModulesPlugin;
//# sourceMappingURL=FederationModulesPlugin.js.map