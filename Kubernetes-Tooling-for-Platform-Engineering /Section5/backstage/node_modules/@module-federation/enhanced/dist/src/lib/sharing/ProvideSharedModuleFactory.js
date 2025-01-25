"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra and Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const ProvideSharedModule_1 = __importDefault(require("./ProvideSharedModule"));
const ModuleFactory = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/ModuleFactory'));
class ProvideSharedModuleFactory extends ModuleFactory {
    /**
     * @param {ModuleFactoryCreateData} data data object
     * @param {function((Error | null)=, ModuleFactoryResult=): void} callback callback
     * @returns {void}
     */
    create(data, callback) {
        // @ts-ignore
        const dep = data
            .dependencies[0];
        callback(null, {
            // @ts-ignore
            module: new ProvideSharedModule_1.default(dep.shareScope, dep.name, dep.version, dep.request, dep.eager, dep.requiredVersion, dep.strictVersion, dep.singleton),
        });
    }
}
exports.default = ProvideSharedModuleFactory;
//# sourceMappingURL=ProvideSharedModuleFactory.js.map