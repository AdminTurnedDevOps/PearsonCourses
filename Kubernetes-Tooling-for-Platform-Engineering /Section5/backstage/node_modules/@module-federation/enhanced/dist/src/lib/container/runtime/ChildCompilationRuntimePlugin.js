"use strict";
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Zackary Jackson @ScriptedAlchemy
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeModuleChunkPlugin = exports.CustomRuntimeModule = exports.CustomRuntimePlugin = void 0;
// This stores the previous child compilation based solution
// it is not currently used
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const utils_1 = require("./utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const webpack_sources_1 = require("webpack-sources");
const core_1 = require("@swc/core");
const sdk_1 = require("@module-federation/sdk");
const { RuntimeModule, Template, RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const onceForCompilationMap = new WeakMap();
const federationGlobal = (0, utils_1.getFederationGlobalScope)(RuntimeGlobals);
class RuntimeModuleChunkPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('ModuleChunkFormatPlugin', (compilation) => {
            compilation.hooks.optimizeModuleIds.tap('ModuleChunkFormatPlugin', (modules) => {
                for (const module of modules) {
                    const moduleId = compilation.chunkGraph.getModuleId(module);
                    if (typeof moduleId === 'string') {
                        compilation.chunkGraph.setModuleId(module, `(embed)${moduleId}`);
                    }
                    else {
                        compilation.chunkGraph.setModuleId(module, `1000${moduleId}`);
                    }
                }
            });
            const hooks = compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation);
            hooks.renderChunk.tap('ModuleChunkFormatPlugin', (modules, renderContext) => {
                const { chunk, chunkGraph } = renderContext;
                const source = new webpack_sources_1.ConcatSource();
                source.add('var federation = ');
                source.add(modules);
                source.add('\n');
                const entries = Array.from(chunkGraph.getChunkEntryModulesWithChunkGroupIterable(chunk));
                for (let i = 0; i < entries.length; i++) {
                    const [module, _entrypoint] = entries[i];
                    const final = i + 1 === entries.length;
                    const moduleId = chunkGraph.getModuleId(module);
                    source.add('\n');
                    if (final) {
                        source.add('for (var mod in federation) {\n');
                        source.add(`${RuntimeGlobals.moduleFactories}[mod] = federation[mod];\n`);
                        source.add('}\n');
                        source.add('federation = ');
                    }
                    source.add(`${RuntimeGlobals.require}(${typeof moduleId === 'number' ? moduleId : JSON.stringify(moduleId)});\n`);
                }
                return source;
            });
        });
    }
}
exports.RuntimeModuleChunkPlugin = RuntimeModuleChunkPlugin;
class CustomRuntimePlugin {
    constructor(path, tempDir) {
        this.bundlerRuntimePath = path.replace('cjs', 'esm');
        this.tempDir = tempDir;
    }
    apply(compiler) {
        compiler.hooks.make.tapAsync('CustomRuntimePlugin', (compilation, callback) => {
            if (onceForCompilationMap.has(compilation))
                return callback();
            onceForCompilationMap.set(compilation, null);
            const target = compilation.options.target || 'default';
            const outputPath = path_1.default.join(this.tempDir, `${target}-custom-runtime-bundle.js`);
            if (fs_1.default.existsSync(outputPath)) {
                const source = fs_1.default.readFileSync(outputPath, 'utf-8');
                onceForCompilationMap.set(compiler, source);
                return callback();
            }
            if (onceForCompilationMap.has(compiler))
                return callback();
            onceForCompilationMap.set(compiler, null);
            const childCompiler = compilation.createChildCompiler('EmbedFederationRuntimeCompiler', {
                filename: '[name].js',
                library: {
                    type: 'var',
                    name: 'federation',
                    export: 'default',
                },
            }, [
                new compiler.webpack.EntryPlugin(compiler.context, this.bundlerRuntimePath, {
                    name: 'custom-runtime-bundle',
                    runtime: 'other',
                }),
                new compiler.webpack.library.EnableLibraryPlugin('var'),
                new RuntimeModuleChunkPlugin(),
            ]);
            childCompiler.context = compiler.context;
            childCompiler.options.devtool = undefined;
            childCompiler.options.optimization.splitChunks = false;
            childCompiler.options.optimization.removeAvailableModules = true;
            sdk_1.logger.log('Creating child compiler for', this.bundlerRuntimePath);
            childCompiler.hooks.thisCompilation.tap(this.constructor.name, (childCompilation) => {
                childCompilation.hooks.processAssets.tap(this.constructor.name, () => {
                    const source = childCompilation.assets['custom-runtime-bundle.js'] &&
                        childCompilation.assets['custom-runtime-bundle.js'].source();
                    const entry = childCompilation.entrypoints.get('custom-runtime-bundle');
                    const entryChunk = entry?.getEntrypointChunk();
                    if (entryChunk) {
                        const entryModule = Array.from(childCompilation.chunkGraph.getChunkEntryModulesIterable(entryChunk))[0];
                        this.entryModule =
                            childCompilation.chunkGraph.getModuleId(entryModule);
                    }
                    onceForCompilationMap.set(compilation, source);
                    onceForCompilationMap.set(compiler, source);
                    fs_1.default.writeFileSync(outputPath, source);
                    sdk_1.logger.log('got compilation asset');
                    childCompilation.chunks.forEach((chunk) => {
                        chunk.files.forEach((file) => {
                            childCompilation.deleteAsset(file);
                        });
                    });
                });
            });
            childCompiler.runAsChild((err, entries, childCompilation) => {
                if (err) {
                    return callback(err);
                }
                if (!childCompilation) {
                    sdk_1.logger.warn('Embed Federation Runtime: Child compilation is undefined');
                    return callback();
                }
                if (childCompilation.errors.length) {
                    return callback(childCompilation.errors[0]);
                }
                sdk_1.logger.log('Code built successfully');
                callback();
            });
        });
        compiler.hooks.thisCompilation.tap('CustomRuntimePlugin', (compilation) => {
            const handler = (chunk, runtimeRequirements) => {
                if (chunk.id === 'build time chunk') {
                    return;
                }
                if (runtimeRequirements.has('embeddedFederationRuntime'))
                    return;
                if (!runtimeRequirements.has(federationGlobal)) {
                    return;
                }
                const bundledCode = onceForCompilationMap.get(compilation);
                if (!bundledCode)
                    return;
                runtimeRequirements.add('embeddedFederationRuntime');
                const runtimeModule = new CustomRuntimeModule(bundledCode, this.entryModule);
                compilation.addRuntimeModule(chunk, runtimeModule);
                sdk_1.logger.log(`Custom runtime module added to chunk: ${chunk.name}`);
            };
            compilation.hooks.runtimeRequirementInTree
                .for(federationGlobal)
                .tap('CustomRuntimePlugin', handler);
        });
    }
}
exports.CustomRuntimePlugin = CustomRuntimePlugin;
class CustomRuntimeModule extends RuntimeModule {
    constructor(entryPath, entryModuleId) {
        super('CustomRuntimeModule', RuntimeModule.STAGE_BASIC);
        this.entryPath = entryPath;
        this.entryPath = entryPath;
        this.entryModuleId = entryModuleId;
    }
    identifier() {
        return 'webpack/runtime/embed/federation';
    }
    generate() {
        const runtimeModule = this.entryPath;
        const { code: transformedCode } = (0, core_1.transformSync)(this.entryPath.replace('var federation;', 'var federation = '), {
            jsc: {
                parser: {
                    syntax: 'ecmascript',
                    jsx: false,
                },
                target: 'es2022',
                minify: {
                    compress: {
                        unused: true,
                        dead_code: true,
                        drop_debugger: true,
                    },
                    mangle: false,
                    format: {
                        comments: false,
                    },
                },
            },
        });
        return Template.asString([
            runtimeModule,
            transformedCode,
            `for (var mod in federation) {
      ${Template.indent(`${RuntimeGlobals.moduleFactories}[mod] = federation[mod];`)}
    }`,
            `federation = ${RuntimeGlobals.require}(${JSON.stringify(this.entryModuleId)});`,
            `federation = ${RuntimeGlobals.compatGetDefaultExport}(federation)();`,
            `var prevFederation = ${federationGlobal}`,
            `${federationGlobal} = {}`,
            `for (var key in federation) {`,
            Template.indent(`${federationGlobal}[key] = federation[key];`),
            `}`,
            `for (var key in prevFederation) {`,
            Template.indent(`${federationGlobal}[key] = prevFederation[key];`),
            `}`,
            'federation = undefined;',
        ]);
    }
}
exports.CustomRuntimeModule = CustomRuntimeModule;
//# sourceMappingURL=ChildCompilationRuntimePlugin.js.map