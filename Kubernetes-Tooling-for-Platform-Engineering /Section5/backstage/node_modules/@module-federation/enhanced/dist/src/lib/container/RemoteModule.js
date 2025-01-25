"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const FallbackDependency_1 = __importDefault(require("./FallbackDependency"));
const RemoteToExternalDependency_1 = __importDefault(require("./RemoteToExternalDependency"));
const Constants_1 = require("../Constants");
const { sources: webpackSources } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const { Module, RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
const TYPES = new Set(['remote', 'share-init']);
const RUNTIME_REQUIREMENTS = new Set([RuntimeGlobals.module]);
class RemoteModule extends Module {
    /**
     * @param {string} request request string
     * @param {string[]} externalRequests list of external requests to containers
     * @param {string} internalRequest name of exposed module in container
     * @param {string} shareScope the used share scope name
     */
    constructor(request, externalRequests, internalRequest, shareScope) {
        super(Constants_1.WEBPACK_MODULE_TYPE_REMOTE);
        this.request = request;
        this.externalRequests = externalRequests;
        this.internalRequest = internalRequest;
        this.shareScope = shareScope;
        this._identifier = `remote (${shareScope}) ${this.externalRequests.join(' ')} ${this.internalRequest}`;
    }
    /**
     * @returns {string} a unique identifier of the module
     */
    identifier() {
        return this._identifier;
    }
    /**
     * @param {RequestShortener} requestShortener the request shortener
     * @returns {string} a user readable identifier of the module
     */
    readableIdentifier(requestShortener) {
        return `remote ${this.request}`;
    }
    /**
     * @param {LibIdentOptions} options options
     * @returns {string | null} an identifier for library inclusion
     */
    libIdent(options) {
        return `${this.layer ? `(${this.layer})/` : ''}webpack/container/remote/${this.request}`;
    }
    /**
     * @param {NeedBuildContext} context context info
     * @param {function((WebpackError | null)=, boolean=): void} callback callback function, returns true, if the module needs a rebuild
     * @returns {void}
     */
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
        if (this.externalRequests.length === 1) {
            this.addDependency(new RemoteToExternalDependency_1.default(this.externalRequests[0]));
        }
        else {
            this.addDependency(new FallbackDependency_1.default(this.externalRequests));
        }
        callback();
    }
    /**
     * @param {string=} type the source type for which the size should be estimated
     * @returns {number} the estimated size of the module (must be non-zero)
     */
    size(type) {
        return 6;
    }
    /**
     * @returns {Set<string>} types available (do not mutate)
     */
    getSourceTypes() {
        return TYPES;
    }
    /**
     * @returns {string | null} absolute path which should be used for condition matching (usually the resource path)
     */
    nameForCondition() {
        return this.request;
    }
    /**
     * @param {CodeGenerationContext} context context for code generation
     * @returns {CodeGenerationResult} result
     */
    // @ts-ignore
    codeGeneration(context) {
        const { moduleGraph, chunkGraph } = context;
        const module = moduleGraph.getModule(this.dependencies[0]);
        const id = module && chunkGraph.getModuleId(module);
        const sources = new Map();
        sources.set('remote', new webpackSources.RawSource(''));
        const data = new Map();
        data.set('share-init', [
            {
                shareScope: this.shareScope,
                initStage: 20,
                init: id === undefined ? '' : `initExternal(${JSON.stringify(id)});`,
            },
        ]);
        return { sources, data, runtimeRequirements: RUNTIME_REQUIREMENTS };
    }
    serialize(context) {
        const { write } = context;
        write(this.request);
        write(this.externalRequests);
        write(this.internalRequest);
        write(this.shareScope);
        super.serialize(context);
    }
    /**
     * @param {ObjectDeserializerContext} context context
     * @returns {RemoteModule} deserialized module
     */
    static deserialize(context) {
        const { read } = context;
        const obj = new RemoteModule(read(), read(), read(), read());
        obj.deserialize(context);
        return obj;
    }
}
makeSerializable(RemoteModule, 'enhanced/lib/container/RemoteModule');
exports.default = RemoteModule;
//# sourceMappingURL=RemoteModule.js.map