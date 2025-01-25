"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const PLUGIN_NAME = 'ContainerReferencePlugin';
class ContainerReferencePlugin {
    constructor(options) {
        this._options = options;
        this.name = PLUGIN_NAME;
    }
    apply(compiler) {
        process.env['FEDERATION_WEBPACK_PATH'] =
            process.env['FEDERATION_WEBPACK_PATH'] || (0, normalize_webpack_path_1.getWebpackPath)(compiler);
        const CoreContainerReferencePlugin = require('../lib/container/ContainerReferencePlugin')
            .default;
        new CoreContainerReferencePlugin(this._options).apply(compiler);
    }
}
exports.default = ContainerReferencePlugin;
//# sourceMappingURL=ContainerReferencePlugin.js.map