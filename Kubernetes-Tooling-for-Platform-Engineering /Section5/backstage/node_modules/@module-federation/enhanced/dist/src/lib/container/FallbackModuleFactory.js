/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy, Marais Rossouw @maraisr
*/
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const FallbackModule_1 = __importDefault(require("./FallbackModule"));
const ModuleFactory = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/ModuleFactory'));
class FallbackModuleFactory extends ModuleFactory {
    /**
     * @param {ModuleFactoryCreateData} data data object
     * @param {function((Error | null)=, ModuleFactoryResult=): void} callback callback
     * @returns {void}
     */
    create(data, callback) {
        const dependency = data.dependencies[0];
        callback(null, {
            // @ts-expect-error Module !== FallbackModule
            module: new FallbackModule_1.default(dependency.requests),
        });
    }
}
exports.default = FallbackModuleFactory;
//# sourceMappingURL=FallbackModuleFactory.js.map