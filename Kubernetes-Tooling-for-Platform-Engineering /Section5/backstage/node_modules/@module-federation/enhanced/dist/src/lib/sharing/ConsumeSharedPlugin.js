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
const sdk_1 = require("@module-federation/sdk");
const options_1 = require("../container/options");
const resolveMatchedConfigs_1 = require("./resolveMatchedConfigs");
const utils_1 = require("./utils");
const ConsumeSharedFallbackDependency_1 = __importDefault(require("./ConsumeSharedFallbackDependency"));
const ConsumeSharedModule_1 = __importDefault(require("./ConsumeSharedModule"));
const ConsumeSharedRuntimeModule_1 = __importDefault(require("./ConsumeSharedRuntimeModule"));
const ProvideForSharedDependency_1 = __importDefault(require("./ProvideForSharedDependency"));
const FederationRuntimePlugin_1 = __importDefault(require("../container/runtime/FederationRuntimePlugin"));
const ShareRuntimeModule_1 = __importDefault(require("./ShareRuntimeModule"));
const ModuleNotFoundError = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/ModuleNotFoundError'));
const { RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const LazySet = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/LazySet'));
const WebpackError = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/WebpackError'));
const createSchemaValidation = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/create-schema-validation'));
const validate = createSchemaValidation(
//eslint-disable-next-line
require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/schemas/plugins/sharing/ConsumeSharedPlugin.check.js')), () => require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/schemas/plugins/sharing/ConsumeSharedPlugin.json')), {
    name: 'Consume Shared Plugin',
    baseDataPath: 'options',
});
const RESOLVE_OPTIONS = {
    dependencyType: 'esm',
};
const PLUGIN_NAME = 'ConsumeSharedPlugin';
class ConsumeSharedPlugin {
    constructor(options) {
        if (typeof options !== 'string') {
            validate(options);
        }
        this._consumes = (0, options_1.parseOptions)(options.consumes, (item, key) => {
            if (Array.isArray(item))
                throw new Error('Unexpected array in options');
            //@ts-ignore
            const result = item === key || !(0, sdk_1.isRequiredVersion)(item)
                ? // item is a request/key
                    {
                        import: key,
                        shareScope: options.shareScope || 'default',
                        shareKey: key,
                        requiredVersion: undefined,
                        packageName: undefined,
                        strictVersion: false,
                        singleton: false,
                        eager: false,
                    }
                : // key is a request/key
                    // item is a version
                    {
                        import: key,
                        shareScope: options.shareScope || 'default',
                        shareKey: key,
                        // webpack internal semver has some issue, use runtime semver , related issue: https://github.com/webpack/webpack/issues/17756
                        requiredVersion: item,
                        strictVersion: true,
                        packageName: undefined,
                        singleton: false,
                        eager: false,
                    };
            return result;
        }, (item, key) => ({
            import: item.import === false ? undefined : item.import || key,
            shareScope: item.shareScope || options.shareScope || 'default',
            shareKey: item.shareKey || key,
            // @ts-ignore  webpack internal semver has some issue, use runtime semver , related issue: https://github.com/webpack/webpack/issues/17756
            requiredVersion: item.requiredVersion,
            strictVersion: typeof item.strictVersion === 'boolean'
                ? item.strictVersion
                : item.import !== false && !item.singleton,
            //@ts-ignore
            packageName: item.packageName,
            singleton: !!item.singleton,
            eager: !!item.eager,
        }));
    }
    apply(compiler) {
        new FederationRuntimePlugin_1.default().apply(compiler);
        process.env['FEDERATION_WEBPACK_PATH'] =
            process.env['FEDERATION_WEBPACK_PATH'] || (0, normalize_webpack_path_1.getWebpackPath)(compiler);
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            compilation.dependencyFactories.set(ConsumeSharedFallbackDependency_1.default, normalModuleFactory);
            let unresolvedConsumes, resolvedConsumes, prefixedConsumes;
            const promise = (0, resolveMatchedConfigs_1.resolveMatchedConfigs)(compilation, this._consumes).then(({ resolved, unresolved, prefixed }) => {
                resolvedConsumes = resolved;
                unresolvedConsumes = unresolved;
                prefixedConsumes = prefixed;
            });
            const resolver = compilation.resolverFactory.get('normal', RESOLVE_OPTIONS);
            const createConsumeSharedModule = (context, request, config) => {
                const requiredVersionWarning = (details) => {
                    const error = new WebpackError(`No required version specified and unable to automatically determine one. ${details}`);
                    error.file = `shared module ${request}`;
                    compilation.warnings.push(error);
                };
                const directFallback = config.import &&
                    /^(\.\.?(\/|$)|\/|[A-Za-z]:|\\\\)/.test(config.import);
                return Promise.all([
                    new Promise((resolve) => {
                        if (!config.import)
                            return resolve(undefined);
                        const resolveContext = {
                            fileDependencies: new LazySet(),
                            contextDependencies: new LazySet(),
                            missingDependencies: new LazySet(),
                        };
                        resolver.resolve({}, directFallback ? compiler.context : context, config.import, resolveContext, (err, result) => {
                            compilation.contextDependencies.addAll(resolveContext.contextDependencies);
                            compilation.fileDependencies.addAll(resolveContext.fileDependencies);
                            compilation.missingDependencies.addAll(resolveContext.missingDependencies);
                            if (err) {
                                compilation.errors.push(new ModuleNotFoundError(null, err, {
                                    name: `resolving fallback for shared module ${request}`,
                                }));
                                return resolve(undefined);
                            }
                            //@ts-ignore
                            resolve(result);
                        });
                    }),
                    new Promise((resolve) => {
                        if (config.requiredVersion !== undefined) {
                            return resolve(config.requiredVersion);
                        }
                        let packageName = config.packageName;
                        if (packageName === undefined) {
                            if (/^(\/|[A-Za-z]:|\\\\)/.test(request)) {
                                // For relative or absolute requests we don't automatically use a packageName.
                                // If wished one can specify one with the packageName option.
                                return resolve(undefined);
                            }
                            const match = /^((?:@[^\\/]+[\\/])?[^\\/]+)/.exec(request);
                            if (!match) {
                                requiredVersionWarning('Unable to extract the package name from request.');
                                return resolve(undefined);
                            }
                            packageName = match[0];
                        }
                        (0, utils_1.getDescriptionFile)(compilation.inputFileSystem, context, ['package.json'], (err, result, checkedDescriptionFilePaths) => {
                            if (err) {
                                requiredVersionWarning(`Unable to read description file: ${err}`);
                                return resolve(undefined);
                            }
                            const { data } = /** @type {DescriptionFile} */ result || {};
                            if (!data) {
                                if (checkedDescriptionFilePaths?.length) {
                                    requiredVersionWarning([
                                        `Unable to find required version for "${packageName}" in description file/s`,
                                        checkedDescriptionFilePaths.join('\n'),
                                        'It need to be in dependencies, devDependencies or peerDependencies.',
                                    ].join('\n'));
                                }
                                else {
                                    requiredVersionWarning(`Unable to find description file in ${context}.`);
                                }
                                return resolve(undefined);
                            }
                            if (data['name'] === packageName) {
                                // Package self-referencing
                                return resolve(undefined);
                            }
                            const requiredVersion = (0, utils_1.getRequiredVersionFromDescriptionFile)(data, packageName);
                            //TODO: align with webpck semver parser again
                            // @ts-ignore  webpack internal semver has some issue, use runtime semver , related issue: https://github.com/webpack/webpack/issues/17756
                            resolve(requiredVersion);
                        }, (result) => {
                            if (!result)
                                return false;
                            const { data } = result;
                            const maybeRequiredVersion = (0, utils_1.getRequiredVersionFromDescriptionFile)(data, packageName);
                            return (data['name'] === packageName ||
                                typeof maybeRequiredVersion === 'string');
                        });
                    }),
                ]).then(([importResolved, requiredVersion]) => {
                    return new ConsumeSharedModule_1.default(directFallback ? compiler.context : context, {
                        ...config,
                        importResolved,
                        import: importResolved ? config.import : undefined,
                        requiredVersion,
                    });
                });
            };
            normalModuleFactory.hooks.factorize.tapPromise(PLUGIN_NAME, ({ context, request, dependencies }) => 
            // wait for resolving to be complete
            //@ts-ignore
            promise.then(() => {
                if (dependencies[0] instanceof ConsumeSharedFallbackDependency_1.default ||
                    dependencies[0] instanceof ProvideForSharedDependency_1.default) {
                    return;
                }
                const match = unresolvedConsumes.get(request);
                if (match !== undefined) {
                    return createConsumeSharedModule(context, request, match);
                }
                for (const [prefix, options] of prefixedConsumes) {
                    if (request.startsWith(prefix)) {
                        const remainder = request.slice(prefix.length);
                        return createConsumeSharedModule(context, request, {
                            ...options,
                            import: options.import
                                ? options.import + remainder
                                : undefined,
                            shareKey: options.shareKey + remainder,
                        });
                    }
                }
            }));
            normalModuleFactory.hooks.createModule.tapPromise(PLUGIN_NAME, ({ resource }, { context, dependencies }) => {
                if (dependencies[0] instanceof ConsumeSharedFallbackDependency_1.default ||
                    dependencies[0] instanceof ProvideForSharedDependency_1.default) {
                    return Promise.resolve();
                }
                if (resource) {
                    const options = resolvedConsumes.get(resource);
                    if (options !== undefined) {
                        return createConsumeSharedModule(context, resource, options);
                    }
                }
                return Promise.resolve();
            });
            compilation.hooks.additionalTreeRuntimeRequirements.tap(PLUGIN_NAME, (chunk, set) => {
                set.add(RuntimeGlobals.module);
                set.add(RuntimeGlobals.moduleCache);
                set.add(RuntimeGlobals.moduleFactoriesAddOnly);
                set.add(RuntimeGlobals.shareScopeMap);
                set.add(RuntimeGlobals.initializeSharing);
                set.add(RuntimeGlobals.hasOwnProperty);
                compilation.addRuntimeModule(chunk, new ConsumeSharedRuntimeModule_1.default(set));
                // FIXME: need to remove webpack internal inject ShareRuntimeModule, otherwise there will be two ShareRuntimeModule
                compilation.addRuntimeModule(chunk, new ShareRuntimeModule_1.default());
            });
        });
    }
}
exports.default = ConsumeSharedPlugin;
//# sourceMappingURL=ConsumeSharedPlugin.js.map