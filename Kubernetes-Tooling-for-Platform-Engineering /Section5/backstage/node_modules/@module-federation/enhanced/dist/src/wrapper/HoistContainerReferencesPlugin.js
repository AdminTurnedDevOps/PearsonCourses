"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const PLUGIN_NAME = 'HoistContainerReferencesPlugin';
class HoistContainerReferencesPlugin {
    constructor() {
        this.name = PLUGIN_NAME;
    }
    apply(compiler) {
        process.env['FEDERATION_WEBPACK_PATH'] =
            process.env['FEDERATION_WEBPACK_PATH'] || (0, normalize_webpack_path_1.getWebpackPath)(compiler);
        const CoreHoistContainerReferencesPlugin = require('../lib/container/HoistContainerReferencesPlugin')
            .default;
        new CoreHoistContainerReferencesPlugin().apply(compiler);
    }
}
exports.default = HoistContainerReferencesPlugin;
//# sourceMappingURL=HoistContainerReferencesPlugin.js.map