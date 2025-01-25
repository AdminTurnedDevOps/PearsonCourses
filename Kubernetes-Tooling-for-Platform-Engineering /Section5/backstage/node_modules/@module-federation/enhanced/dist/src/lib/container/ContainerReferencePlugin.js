"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
// import * as RuntimeGlobals from 'webpack/lib/RuntimeGlobals';
const FallbackDependency_1 = __importDefault(require("./FallbackDependency"));
const FallbackItemDependency_1 = __importDefault(require("./FallbackItemDependency"));
const FallbackModuleFactory_1 = __importDefault(require("./FallbackModuleFactory"));
const RemoteModule_1 = __importDefault(require("./RemoteModule"));
const RemoteRuntimeModule_1 = __importDefault(require("./RemoteRuntimeModule"));
const RemoteToExternalDependency_1 = __importDefault(require("./RemoteToExternalDependency"));
const options_1 = require("./options");
const FederationRuntimePlugin_1 = __importDefault(require("./runtime/FederationRuntimePlugin"));
const ContainerReferencePlugin_1 = __importDefault(require("../../schemas/container/ContainerReferencePlugin"));
const ContainerReferencePlugin_check_1 = __importDefault(require("../../schemas/container/ContainerReferencePlugin.check"));
const { ExternalsPlugin } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const createSchemaValidation = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/create-schema-validation'));
const validate = createSchemaValidation(
//eslint-disable-next-line
ContainerReferencePlugin_check_1.default, () => ContainerReferencePlugin_1.default, {
    name: 'Container Reference Plugin',
    baseDataPath: 'options',
});
const slashCode = '/'.charCodeAt(0);
class ContainerReferencePlugin {
    constructor(options) {
        validate(options);
        this._remoteType = options.remoteType;
        this._remotes = (0, options_1.parseOptions)(options.remotes, (item) => ({
            external: Array.isArray(item) ? item : [item],
            shareScope: options.shareScope || 'default',
        }), (item) => ({
            external: Array.isArray(item.external)
                ? item.external
                : [item.external],
            shareScope: item.shareScope || options.shareScope || 'default',
        }));
    }
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        const { _remotes: remotes, _remoteType: remoteType } = this;
        new FederationRuntimePlugin_1.default().apply(compiler);
        /** @type {Record<string, string>} */
        const remoteExternals = {};
        for (const [key, config] of remotes) {
            let i = 0;
            for (const external of config.external) {
                if (typeof external === 'string' && external.startsWith('internal ')) {
                    continue;
                }
                remoteExternals[`webpack/container/reference/${key}${i ? `/fallback-${i}` : ''}`] = external;
                i++;
            }
        }
        const Externals = compiler.webpack.ExternalsPlugin || ExternalsPlugin;
        new Externals(remoteType, remoteExternals).apply(compiler);
        compiler.hooks.compilation.tap('ContainerReferencePlugin', (compilation, { normalModuleFactory }) => {
            compilation.dependencyFactories.set(RemoteToExternalDependency_1.default, normalModuleFactory);
            compilation.dependencyFactories.set(FallbackItemDependency_1.default, normalModuleFactory);
            compilation.dependencyFactories.set(FallbackDependency_1.default, new FallbackModuleFactory_1.default());
            normalModuleFactory.hooks.factorize.tap('ContainerReferencePlugin', 
            // @ts-ignore
            (data) => {
                if (!data.request.includes('!')) {
                    for (const [key, config] of remotes) {
                        if (data.request.startsWith(`${key}`) &&
                            (data.request.length === key.length ||
                                data.request.charCodeAt(key.length) === slashCode)) {
                            return new RemoteModule_1.default(data.request, 
                            //@ts-ignore
                            config.external.map((external, i) => external.startsWith('internal ')
                                ? external.slice(9)
                                : `webpack/container/reference/${key}${i ? `/fallback-${i}` : ''}`), `.${data.request.slice(key.length)}`, 
                            //@ts-ignore
                            config.shareScope);
                        }
                    }
                }
            });
            compilation.hooks.runtimeRequirementInTree
                .for(compiler.webpack.RuntimeGlobals.ensureChunkHandlers)
                .tap('ContainerReferencePlugin', (chunk, set) => {
                set.add(compiler.webpack.RuntimeGlobals.module);
                set.add(compiler.webpack.RuntimeGlobals.moduleFactoriesAddOnly);
                set.add(compiler.webpack.RuntimeGlobals.hasOwnProperty);
                set.add(compiler.webpack.RuntimeGlobals.initializeSharing);
                set.add(compiler.webpack.RuntimeGlobals.shareScopeMap);
                compilation.addRuntimeModule(chunk, new RemoteRuntimeModule_1.default());
            });
        });
    }
}
exports.default = ContainerReferencePlugin;
//# sourceMappingURL=ContainerReferencePlugin.js.map