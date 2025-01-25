"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const { dependencies } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class ProvideForSharedDependency extends dependencies.ModuleDependency {
    /**
     *
     * @param request request string
     */
    constructor(request) {
        super(request);
    }
    get type() {
        return 'provide module for shared';
    }
    get category() {
        return 'esm';
    }
}
makeSerializable(ProvideForSharedDependency, 'enhanced/lib/sharing/ProvideForSharedDependency');
exports.default = ProvideForSharedDependency;
//# sourceMappingURL=ProvideForSharedDependency.js.map