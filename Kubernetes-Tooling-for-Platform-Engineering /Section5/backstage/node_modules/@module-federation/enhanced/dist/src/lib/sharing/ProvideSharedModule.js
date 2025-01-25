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
const ProvideForSharedDependency_1 = __importDefault(require("./ProvideForSharedDependency"));
const Constants_1 = require("../Constants");
const { AsyncDependenciesBlock, Module, RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const TYPES = new Set(['share-init']);
/**
 * @class
 * @extends {Module}
 */
class ProvideSharedModule extends Module {
    /**
     * @constructor
     * @param {string} shareScope shared scope name
     * @param {string} name shared key
     * @param {string | false} version version
     * @param {string} request request to the provided module
     * @param {boolean} eager include the module in sync way
     * @param {boolean} requiredVersion version requirement
     * @param {boolean} strictVersion don't use shared version even if version isn't valid
     * @param {boolean} singleton use single global version
     */
    constructor(shareScope, name, version, request, eager, requiredVersion, strictVersion, singleton) {
        super(Constants_1.WEBPACK_MODULE_TYPE_PROVIDE);
        this._shareScope = shareScope;
        this._name = name;
        this._version = version;
        this._request = request;
        this._eager = eager;
        this._requiredVersion = requiredVersion;
        this._strictVersion = strictVersion;
        this._singleton = singleton;
    }
    /**
     * @returns {string} a unique identifier of the module
     */
    identifier() {
        return `provide module (${this._shareScope}) ${this._name}@${this._version} = ${this._request}`;
    }
    /**
     * @param {RequestShortener} requestShortener the request shortener
     * @returns {string} a user readable identifier of the module
     */
    readableIdentifier(requestShortener) {
        return `provide shared module (${this._shareScope}) ${this._name}@${this._version} = ${requestShortener.shorten(this._request)}`;
    }
    /**
     * @param {LibIdentOptions} options options
     * @returns {string | null} an identifier for library inclusion
     */
    libIdent(options) {
        return `${this.layer ? `(${this.layer})/` : ''}webpack/sharing/provide/${this._shareScope}/${this._name}`;
    }
    /**
     * @param {NeedBuildContext} context context info
     * @param {function((WebpackError | null)=, boolean=): void} callback callback function, returns true, if the module needs a rebuild
     * @returns {void}
     */
    // @ts-ignore
    needBuild(context, callback) {
        callback(null, !this.buildInfo);
    }
    /**
     * @param {WebpackOptions} options webpack options
     * @param {Compilation} compilation the compilation
     * @param {ResolverWithOptions} resolver the resolver
     * @param {InputFileSystem} fs the file system
     * @param {function(WebpackError=): void} callback callback function
     * @returns {void}
     */
    // @ts-ignore
    build(options, compilation, resolver, fs, callback) {
        this.buildMeta = {};
        this.buildInfo = {
            strict: true,
        };
        this.clearDependenciesAndBlocks();
        const dep = new ProvideForSharedDependency_1.default(this._request);
        if (this._eager) {
            this.addDependency(dep);
        }
        else {
            const block = new AsyncDependenciesBlock({});
            block.addDependency(dep);
            this.addBlock(block);
        }
        callback();
    }
    /**
     * @param {string=} type the source type for which the size should be estimated
     * @returns {number} the estimated size of the module (must be non-zero)
     */
    size(type) {
        return 42;
    }
    /**
     * @returns {Set<string>} types available (do not mutate)
     */
    getSourceTypes() {
        return TYPES;
    }
    /**
     * @param {CodeGenerationContext} context context for code generation
     * @returns {CodeGenerationResult} result
     */
    // @ts-ignore
    codeGeneration({ runtimeTemplate, moduleGraph, chunkGraph, }) {
        const runtimeRequirements = new Set([RuntimeGlobals.initializeSharing]);
        const moduleGetter = this._eager
            ? runtimeTemplate.syncModuleFactory({
                //@ts-ignore
                dependency: this.dependencies[0],
                chunkGraph,
                request: this._request,
                runtimeRequirements,
            })
            : runtimeTemplate.asyncModuleFactory({
                //@ts-ignore
                block: this.blocks[0],
                chunkGraph,
                request: this._request,
                runtimeRequirements,
            });
        const code = `register(${JSON.stringify(this._name)}, ${JSON.stringify(this._version || '0')}, ${moduleGetter}${this._eager ? ', 1' : ''});`;
        const sources = new Map();
        const data = new Map();
        data.set('share-init', [
            {
                shareScope: this._shareScope,
                initStage: 10,
                init: code,
            },
        ]);
        data.set('share-init-option', {
            name: this._name,
            version: JSON.stringify(this._version || '0'),
            request: this._request,
            getter: moduleGetter,
            shareScope: [this._shareScope],
            shareConfig: {
                eager: this._eager,
                requiredVersion: this._requiredVersion,
                strictVersion: this._strictVersion,
                singleton: this._singleton,
            },
        });
        return { sources, data, runtimeRequirements };
    }
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context) {
        const { write } = context;
        write(this._shareScope);
        write(this._name);
        write(this._version);
        write(this._request);
        write(this._eager);
        write(this._requiredVersion);
        write(this._strictVersion);
        write(this._singleton);
        super.serialize(context);
    }
    /**
     * @param {ObjectDeserializerContext} context context
     * @returns {ProvideSharedModule} deserialize fallback dependency
     */
    static deserialize(context) {
        const { read } = context;
        const obj = new ProvideSharedModule(read(), read(), read(), read(), read(), read(), read(), read());
        obj.deserialize(context);
        return obj;
    }
}
makeSerializable(ProvideSharedModule, 'enhanced/lib/sharing/ProvideSharedModule');
exports.default = ProvideSharedModule;
//# sourceMappingURL=ProvideSharedModule.js.map