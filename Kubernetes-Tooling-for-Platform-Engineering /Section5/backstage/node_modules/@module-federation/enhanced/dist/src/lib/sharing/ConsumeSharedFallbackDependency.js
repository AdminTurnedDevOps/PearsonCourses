/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const { dependencies } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class ConsumeSharedFallbackDependency extends dependencies.ModuleDependency {
    /**
     * @param {string} request the request
     */
    constructor(request) {
        super(request);
    }
    get type() {
        return 'consume shared fallback';
    }
    get category() {
        return 'esm';
    }
}
makeSerializable(ConsumeSharedFallbackDependency, 'enhanced/lib/sharing/ConsumeSharedFallbackDependency');
exports.default = ConsumeSharedFallbackDependency;
//# sourceMappingURL=ConsumeSharedFallbackDependency.js.map