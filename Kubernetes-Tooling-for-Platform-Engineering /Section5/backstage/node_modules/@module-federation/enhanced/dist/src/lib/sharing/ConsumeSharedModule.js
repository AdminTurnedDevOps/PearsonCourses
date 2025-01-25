/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const ConsumeSharedFallbackDependency_1 = __importDefault(require("./ConsumeSharedFallbackDependency"));
const utils_1 = require("./utils");
const Constants_1 = require("../Constants");
const { rangeToString, stringifyHoley } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/semver'));
const { AsyncDependenciesBlock, Module, RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const { sources: webpackSources } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const makeSerializable = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/makeSerializable'));
/**
 * @typedef {Object} ConsumeOptions
 * @property {string=} import fallback request
 * @property {string=} importResolved resolved fallback request
 * @property {string} shareKey global share key
 * @property {string} shareScope share scope
 * @property {SemVerRange | false | undefined} requiredVersion version requirement
 * @property {string} packageName package name to determine required version automatically
 * @property {boolean} strictVersion don't use shared version even if version isn't valid
 * @property {boolean} singleton use single global version
 * @property {boolean} eager include the fallback module in a sync way
 */
const TYPES = new Set(['consume-shared']);
class ConsumeSharedModule extends Module {
    /**
     * @param {string} context context
     * @param {ConsumeOptions} options consume options
     */
    constructor(context, options) {
        super(Constants_1.WEBPACK_MODULE_TYPE_CONSUME_SHARED_MODULE, context);
        this.options = options;
    }
    /**
     * @returns {string} a unique identifier of the module
     */
    identifier() {
        const { shareKey, shareScope, importResolved, requiredVersion, strictVersion, singleton, eager, } = this.options;
        return `${Constants_1.WEBPACK_MODULE_TYPE_CONSUME_SHARED_MODULE}|${shareScope}|${shareKey}|${requiredVersion && rangeToString(requiredVersion)}|${strictVersion}|${importResolved}|${singleton}|${eager}`;
    }
    /**
     * @param {RequestShortener} requestShortener the request shortener
     * @returns {string} a user readable identifier of the module
     */
    readableIdentifier(requestShortener) {
        const { shareKey, shareScope, importResolved, requiredVersion, strictVersion, singleton, eager, } = this.options;
        return `consume shared module (${shareScope}) ${shareKey}@${requiredVersion ? rangeToString(requiredVersion) : '*'}${strictVersion ? ' (strict)' : ''}${singleton ? ' (singleton)' : ''}${importResolved
            ? ` (fallback: ${requestShortener.shorten(importResolved)})`
            : ''}${eager ? ' (eager)' : ''}`;
    }
    /**
     * @param {LibIdentOptions} options options
     * @returns {string | null} an identifier for library inclusion
     */
    libIdent(options) {
        const { shareKey, shareScope, import: request } = this.options;
        return `${this.layer ? `(${this.layer})/` : ''}webpack/sharing/consume/${shareScope}/${shareKey}${request ? `/${request}` : ''}`;
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
        this.buildInfo = {};
        if (this.options.import) {
            const dep = new ConsumeSharedFallbackDependency_1.default(this.options.import);
            if (this.options.eager) {
                this.addDependency(dep);
            }
            else {
                const block = new AsyncDependenciesBlock({});
                block.addDependency(dep);
                this.addBlock(block);
            }
        }
        callback();
    }
    /**
     * @returns {Set<string>} types available (do not mutate)
     */
    getSourceTypes() {
        return TYPES;
    }
    /**
     * @param {string=} type the source type for which the size should be estimated
     * @returns {number} the estimated size of the module (must be non-zero)
     */
    size(type) {
        return 42;
    }
    /**
     * @param {Hash} hash the hash used to track dependencies
     * @param {UpdateHashContext} context context
     * @returns {void}
     */
    // @ts-ignore
    updateHash(hash, context) {
        hash.update(JSON.stringify(this.options));
        // @ts-ignore
        super.updateHash(hash, context);
    }
    /**
     * @param {CodeGenerationContext} context context for code generation
     * @returns {CodeGenerationResult} result
     */
    // @ts-ignore
    codeGeneration({ chunkGraph, moduleGraph, runtimeTemplate, }) {
        const runtimeRequirements = new Set([RuntimeGlobals.shareScopeMap]);
        const { shareScope, shareKey, strictVersion, requiredVersion, import: request, singleton, eager, } = this.options;
        let fallbackCode;
        if (request) {
            if (eager) {
                const dep = this.dependencies[0];
                fallbackCode = runtimeTemplate.syncModuleFactory({
                    // @ts-ignore
                    dependency: dep,
                    chunkGraph,
                    runtimeRequirements,
                    request: this.options.import,
                });
            }
            else {
                const block = this.blocks[0];
                fallbackCode = runtimeTemplate.asyncModuleFactory({
                    // @ts-ignore
                    block,
                    chunkGraph,
                    runtimeRequirements,
                    request: this.options.import,
                });
            }
        }
        let fn = 'load';
        const args = [JSON.stringify(shareScope), JSON.stringify(shareKey)];
        if (requiredVersion) {
            if (strictVersion) {
                fn += 'Strict';
            }
            if (singleton) {
                fn += 'Singleton';
            }
            args.push(stringifyHoley(requiredVersion));
            fn += 'VersionCheck';
        }
        else {
            if (singleton) {
                fn += 'Singleton';
            }
        }
        if (fallbackCode) {
            fn += 'Fallback';
            args.push(fallbackCode);
        }
        // const code = runtimeTemplate.returningFunction(`${fn}(${args.join(', ')})`);
        const sources = new Map();
        sources.set('consume-shared', new webpackSources.RawSource(fallbackCode ||
            `()=>()=>{throw new Error("Can not get '${shareKey}'")}`));
        const data = new Map();
        data.set('consume-shared', (0, utils_1.normalizeConsumeShareOptions)(this.options));
        return {
            runtimeRequirements,
            sources,
            data,
        };
    }
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context) {
        const { write } = context;
        write(this.options);
        super.serialize(context);
    }
    /**
     * @param {ObjectDeserializerContext} context context
     */
    deserialize(context) {
        const { read } = context;
        this.options = read();
        super.deserialize(context);
    }
}
makeSerializable(ConsumeSharedModule, 'enhanced/lib/sharing/ConsumeSharedModule');
exports.default = ConsumeSharedModule;
//# sourceMappingURL=ConsumeSharedModule.js.map