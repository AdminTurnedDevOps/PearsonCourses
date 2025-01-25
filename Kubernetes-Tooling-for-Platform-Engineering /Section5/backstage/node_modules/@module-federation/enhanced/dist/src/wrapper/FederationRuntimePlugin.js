"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const PLUGIN_NAME = 'FederationRuntimePlugin';
class FederationRuntimePlugin {
    constructor(options) {
        this._options = options;
        this.name = PLUGIN_NAME;
        this.entryFilePath = '';
    }
    apply(compiler) {
        process.env['FEDERATION_WEBPACK_PATH'] =
            process.env['FEDERATION_WEBPACK_PATH'] || (0, normalize_webpack_path_1.getWebpackPath)(compiler);
        const CoreFederationRuntimePlugin = require('../lib/container/runtime/FederationRuntimePlugin')
            .default;
        const pluginInstance = new CoreFederationRuntimePlugin(this._options);
        pluginInstance.apply(compiler);
        this.entryFilePath = pluginInstance.entryFilePath;
    }
}
exports.default = FederationRuntimePlugin;
//# sourceMappingURL=FederationRuntimePlugin.js.map