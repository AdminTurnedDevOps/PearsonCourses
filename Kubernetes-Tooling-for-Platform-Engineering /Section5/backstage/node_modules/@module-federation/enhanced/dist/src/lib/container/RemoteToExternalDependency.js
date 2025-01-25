/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const { dependencies } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class RemoteToExternalDependency extends dependencies.ModuleDependency {
    /**
     * @param {string} request request
     */
    constructor(request) {
        super(request);
    }
    get type() {
        return 'remote to external';
    }
    get category() {
        return 'esm';
    }
}
makeSerializable(RemoteToExternalDependency, 'enhanced/lib/container/RemoteToExternalDependency');
exports.default = RemoteToExternalDependency;
//# sourceMappingURL=RemoteToExternalDependency.js.map