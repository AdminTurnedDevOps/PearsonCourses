"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const SortableSet = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/SortableSet'));
class AsyncEntryStartupPlugin {
    constructor(options) {
        this._runtimeChunks = new Map();
        this._options = options || {};
    }
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('AsyncEntryStartupPlugin', (compilation) => {
            this._collectRuntimeChunks(compilation);
            this._handleRenderStartup(compiler, compilation);
        });
    }
    _collectRuntimeChunks(compilation) {
        compilation.hooks.beforeChunkAssets.tap('AsyncEntryStartupPlugin', () => {
            for (const chunk of compilation.chunks) {
                if (chunk.hasRuntime() && chunk.id !== null) {
                    this._runtimeChunks.set(chunk.id, chunk);
                    for (const dependentChunk of compilation.chunkGraph.getChunkEntryDependentChunksIterable(chunk)) {
                        if (dependentChunk.id !== null) {
                            this._runtimeChunks.set(dependentChunk.id, dependentChunk);
                        }
                    }
                }
            }
        });
    }
    getChunkByName(compilation, dependOn, byname) {
        for (const name of dependOn) {
            const chunk = compilation.namedChunks.get(name);
            if (chunk) {
                byname.add(chunk);
            }
        }
    }
    _handleRenderStartup(compiler, compilation) {
        compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).renderStartup.tap('AsyncEntryStartupPlugin', (source, _renderContext, upperContext) => {
            const isSingleRuntime = compiler.options?.optimization?.runtimeChunk;
            if (upperContext?.chunk.id && isSingleRuntime) {
                if (upperContext?.chunk.hasRuntime()) {
                    this._runtimeChunks.set(upperContext.chunk.id, upperContext.chunk);
                    return source;
                }
            }
            if (this._options.excludeChunk &&
                this._options.excludeChunk(upperContext.chunk)) {
                return source;
            }
            const runtime = this._getChunkRuntime(upperContext);
            let remotes = '';
            let shared = '';
            for (const runtimeItem of runtime) {
                if (!runtimeItem) {
                    continue;
                }
                const requirements = compilation.chunkGraph.getTreeRuntimeRequirements(runtimeItem);
                const entryOptions = upperContext.chunk.getEntryOptions();
                const chunkInitialsSet = new Set(compilation.chunkGraph.getChunkEntryDependentChunksIterable(upperContext.chunk));
                chunkInitialsSet.add(upperContext.chunk);
                const dependOn = entryOptions?.dependOn || [];
                this.getChunkByName(compilation, dependOn, chunkInitialsSet);
                const initialChunks = [];
                let hasRemoteModules = false;
                let consumeShares = false;
                for (const chunk of chunkInitialsSet) {
                    initialChunks.push(chunk.id);
                    if (!hasRemoteModules) {
                        hasRemoteModules = Boolean(compilation.chunkGraph.getChunkModulesIterableBySourceType(chunk, 'remote'));
                    }
                    if (!consumeShares) {
                        consumeShares = Boolean(compilation.chunkGraph.getChunkModulesIterableBySourceType(chunk, 'consume-shared'));
                    }
                    if (hasRemoteModules && consumeShares) {
                        break;
                    }
                }
                remotes = this._getRemotes(compiler.webpack.RuntimeGlobals, requirements, hasRemoteModules, initialChunks, remotes);
                shared = this._getShared(compiler.webpack.RuntimeGlobals, requirements, consumeShares, initialChunks, shared);
            }
            if (!remotes && !shared) {
                return source;
            }
            const initialEntryModules = this._getInitialEntryModules(compilation, upperContext);
            const templateString = this._getTemplateString(compiler, initialEntryModules, shared, remotes, source);
            return new compiler.webpack.sources.ConcatSource(templateString);
        });
    }
    _getChunkRuntime(upperContext) {
        const runtime = new Set();
        const chunkRuntime = upperContext.chunk.runtime;
        if (chunkRuntime) {
            const runtimeItems = chunkRuntime instanceof SortableSet ? chunkRuntime : [chunkRuntime];
            for (const runtimeItem of runtimeItems) {
                const chunk = this._runtimeChunks.get(runtimeItem);
                if (chunk) {
                    runtime.add(chunk);
                }
            }
        }
        if (runtime.size === 0) {
            runtime.add(upperContext.chunk);
        }
        return runtime;
    }
    _getRemotes(runtimeGlobals, requirements, hasRemoteModules, chunksToRef, remotes) {
        if (!requirements.has(runtimeGlobals.currentRemoteGetScope) &&
            !hasRemoteModules &&
            !requirements.has('__webpack_require__.vmok')) {
            return remotes;
        }
        const remotesParts = remotes.startsWith('if(__webpack_require__.f && __webpack_require__.f.remotes) {')
            ? [remotes]
            : [
                remotes,
                'if(__webpack_require__.f && __webpack_require__.f.remotes) {',
            ];
        for (const chunkId of chunksToRef) {
            if (chunkId !== null && chunkId !== undefined) {
                remotesParts.push(` __webpack_require__.f.remotes(${JSON.stringify(chunkId)}, promiseTrack);`);
            }
        }
        remotesParts.push('}');
        return remotesParts.join('');
    }
    _getShared(runtimeGlobals, requirements, consumeShares, chunksToRef, shared) {
        if (!requirements.has(runtimeGlobals.shareScopeMap) &&
            !consumeShares &&
            !requirements.has(runtimeGlobals.initializeSharing)) {
            return shared;
        }
        const sharedParts = shared.startsWith('if(__webpack_require__.f && __webpack_require__.f.consumes) {')
            ? [shared]
            : [
                shared,
                'if(__webpack_require__.f && __webpack_require__.f.consumes) {',
            ];
        for (const chunkId of chunksToRef) {
            if (chunkId !== null && chunkId !== undefined) {
                sharedParts.push(` __webpack_require__.f.consumes(${JSON.stringify(chunkId)}, promiseTrack);`);
            }
        }
        sharedParts.push('}');
        return sharedParts.join('');
    }
    _getInitialEntryModules(compilation, upperContext) {
        const entryModules = compilation.chunkGraph.getChunkEntryModulesIterable(upperContext.chunk);
        const initialEntryModules = [];
        for (const entryModule of entryModules) {
            const entryModuleID = compilation.chunkGraph.getModuleId(entryModule);
            if (entryModuleID) {
                let shouldInclude = false;
                if (typeof this._options.eager === 'function') {
                    shouldInclude = this._options.eager(entryModule);
                }
                else if (this._options.eager &&
                    this._options.eager.test(entryModule.identifier())) {
                    shouldInclude = true;
                }
                if (shouldInclude) {
                    initialEntryModules.push(`if(__webpack_require__.m[${JSON.stringify(entryModuleID)}]) {
              __webpack_require__(${JSON.stringify(entryModuleID)});
            } else {
              console.warn('Federation Runtime Module not found. In the current runtime');
            }`);
                }
            }
        }
        return initialEntryModules;
    }
    _getTemplateString(compiler, initialEntryModules, shared, remotes, source) {
        const { Template } = compiler.webpack;
        if (compiler.options?.experiments?.topLevelAwait &&
            compiler.options?.experiments?.outputModule) {
            return Template.asString([
                'var promiseTrack = [];',
                Template.asString(initialEntryModules),
                shared,
                remotes,
                'await Promise.all(promiseTrack)',
                Template.indent(source.source().toString()),
            ]);
        }
        return Template.asString([
            'var promiseTrack = [];',
            Template.asString(initialEntryModules),
            shared,
            remotes,
            'var __webpack_exports__ = Promise.all(promiseTrack).then(function() {',
            Template.indent(source.source().toString()),
            Template.indent('return __webpack_exports__'),
            '});',
        ]);
    }
}
exports.default = AsyncEntryStartupPlugin;
//# sourceMappingURL=AsyncBoundaryPlugin.js.map