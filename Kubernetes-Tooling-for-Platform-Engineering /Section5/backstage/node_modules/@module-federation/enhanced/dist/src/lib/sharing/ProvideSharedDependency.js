"use strict";
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const { Dependency } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class ProvideSharedDependency extends Dependency {
    /**
     * @param {string} shareScope share scope
     * @param {string} name module name
     * @param {string | false} version version
     * @param {string} request request
     * @param {boolean} eager true, if this is an eager dependency
     * @param {boolean} requiredVersion version requirement
     * @param {boolean} strictVersion don't use shared version even if version isn't valid
     * @param {boolean} singleton use single global version
     */
    constructor(shareScope, name, version, request, eager, requiredVersion, strictVersion, singleton) {
        super();
        this.shareScope = shareScope;
        this.name = name;
        this.version = version;
        this.request = request;
        this.eager = eager;
        this.requiredVersion = requiredVersion;
        this.strictVersion = strictVersion;
        this.singleton = singleton;
    }
    get type() {
        return 'provide shared module';
    }
    /**
     * @returns {string | null} an identifier to merge equal requests
     */
    getResourceIdentifier() {
        return `provide module (${this.shareScope}) ${this.request} as ${this.name} @ ${this.version}${this.eager ? ' (eager)' : ''}`;
    }
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context) {
        context.write(this.shareScope);
        context.write(this.name);
        context.write(this.request);
        context.write(this.version);
        context.write(this.eager);
        context.write(this.requiredVersion);
        context.write(this.strictVersion);
        context.write(this.singleton);
        super.serialize(context);
    }
    /**
     * @param {ObjectDeserializerContext} context context
     * @returns {ProvideSharedDependency} deserialize fallback dependency
     */
    static deserialize(context) {
        const { read } = context;
        const obj = new ProvideSharedDependency(read(), read(), read(), read(), read(), read(), read(), read());
        //@ts-ignore
        this.shareScope = context.read();
        obj.deserialize(context);
        return obj;
    }
}
makeSerializable(ProvideSharedDependency, 'enhanced/lib/sharing/ProvideSharedDependency');
exports.default = ProvideSharedDependency;
//# sourceMappingURL=ProvideSharedDependency.js.map