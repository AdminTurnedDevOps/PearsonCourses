"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy, Marais Rossouw @maraisr
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const { dependencies } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class ContainerExposedDependency extends dependencies.ModuleDependency {
    /**
     * @param {string} exposedName public name
     * @param {string} request request to module
     */
    constructor(exposedName, request) {
        super(request);
        this.exposedName = exposedName;
        this.request = request;
    }
    get type() {
        return 'container exposed';
    }
    get category() {
        return 'esm';
    }
    /**
     * @returns {string | null} an identifier to merge equal requests
     */
    getResourceIdentifier() {
        return `exposed dependency ${this.exposedName}=${this.request}`;
    }
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context) {
        context.write(this.exposedName);
        super.serialize(context);
    }
    /**
     * @param {ObjectDeserializerContext} context context
     */
    deserialize(context) {
        this.exposedName = context.read();
        super.deserialize(context);
    }
}
makeSerializable(ContainerExposedDependency, 'enhanced/lib/container/ContainerExposedDependency');
exports.default = ContainerExposedDependency;
//# sourceMappingURL=ContainerExposedDependency.js.map