"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const ModuleDependency = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/dependencies/ModuleDependency'));
class FederationRuntimeDependency extends ModuleDependency {
    constructor(request) {
        super(request);
    }
    get type() {
        return 'federation runtime dependency';
    }
}
exports.default = FederationRuntimeDependency;
//# sourceMappingURL=FederationRuntimeDependency.js.map