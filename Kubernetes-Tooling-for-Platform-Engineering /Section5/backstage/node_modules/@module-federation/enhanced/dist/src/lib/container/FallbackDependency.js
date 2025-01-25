/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const { Dependency } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class FallbackDependency extends Dependency {
    /**
     * @param {string[]} requests requests
     */
    constructor(requests) {
        super();
        this.requests = requests;
    }
    /**
     * @returns {string | null} an identifier to merge equal requests
     */
    getResourceIdentifier() {
        return `fallback ${this.requests.join(' ')}`;
    }
    get type() {
        return 'fallback';
    }
    get category() {
        return 'esm';
    }
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context) {
        const { write } = context;
        write(this.requests);
        super.serialize(context);
    }
    static deserialize(context) {
        const { read } = context;
        const obj = new FallbackDependency(read());
        obj.deserialize(context);
        return obj;
    }
}
makeSerializable(FallbackDependency, 'enhanced/lib/container/FallbackDependency');
exports.default = FallbackDependency;
//# sourceMappingURL=FallbackDependency.js.map