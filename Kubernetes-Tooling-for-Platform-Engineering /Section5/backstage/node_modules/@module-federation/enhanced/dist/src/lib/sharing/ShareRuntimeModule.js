/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const utils_1 = require("../container/runtime/utils");
const { Template, RuntimeGlobals, RuntimeModule } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
const { compareModulesByIdentifier } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/comparators'));
class ShareRuntimeModule extends RuntimeModule {
    constructor() {
        // must after FederationRuntimeModule
        super('sharing', RuntimeModule.STAGE_NORMAL + 2);
    }
    /**
     * @returns {string | null} runtime code
     */
    generate() {
        const compilation = this.compilation;
        if (!compilation) {
            throw new Error('Compilation is undefined');
        }
        const { runtimeTemplate, codeGenerationResults } = compilation;
        const chunkGraph = this.chunkGraph;
        if (!chunkGraph) {
            throw new Error('ChunkGraph is undefined');
        }
        const initCodePerScope = new Map();
        const sharedInitOptions = {};
        for (const chunk of this.chunk?.getAllReferencedChunks() || []) {
            if (!chunk) {
                continue;
            }
            const modules = chunkGraph.getOrderedChunkModulesIterableBySourceType(chunk, 'share-init', compareModulesByIdentifier);
            if (!modules)
                continue;
            for (const m of modules) {
                const data = codeGenerationResults.getData(m, chunk.runtime, 'share-init');
                if (!data)
                    continue;
                for (const item of data) {
                    const { shareScope, initStage, init } = item;
                    let stages = initCodePerScope.get(shareScope);
                    if (stages === undefined) {
                        initCodePerScope.set(shareScope, (stages = new Map()));
                    }
                    let list = stages.get(initStage || 0);
                    if (list === undefined) {
                        stages.set(initStage || 0, (list = new Set()));
                    }
                    list.add(init);
                }
                const sharedOption = codeGenerationResults.getData(m, chunk.runtime, 'share-init-option');
                if (sharedOption) {
                    sharedInitOptions[sharedOption.name] =
                        sharedInitOptions[sharedOption.name] || [];
                    const isSameVersion = sharedInitOptions[sharedOption.name].find((s) => s.version === sharedOption.version);
                    if (!isSameVersion) {
                        sharedInitOptions[sharedOption.name].push(sharedOption);
                    }
                }
            }
        }
        const sharedInitOptionsStr = Object.keys(sharedInitOptions).reduce((sum, sharedName) => {
            const sharedOptions = sharedInitOptions[sharedName];
            let str = '';
            sharedOptions.forEach((sharedOption) => {
                str += `{${Template.indent([
                    `version: ${sharedOption.version},`,
                    `get: ${sharedOption.getter},`,
                    `scope: ${JSON.stringify(sharedOption.shareScope)},`,
                    `shareConfig: ${JSON.stringify(sharedOption.shareConfig)}`,
                ])}},`;
            });
            str = `[${str}]`;
            sum += `${Template.indent([`"${sharedName}": ${str},`])}`;
            return sum;
        }, '');
        const federationGlobal = (0, utils_1.getFederationGlobalScope)(RuntimeGlobals || {});
        return Template.asString([
            `${(0, utils_1.getFederationGlobalScope)(RuntimeGlobals)}.initOptions.shared = {${sharedInitOptionsStr}}`,
            `${RuntimeGlobals.shareScopeMap} = {};`,
            'var initPromises = {};',
            'var initTokens = {};',
            `${RuntimeGlobals.initializeSharing} = ${runtimeTemplate.basicFunction('name, initScope', [
                `return ${federationGlobal}.bundlerRuntime.I({${Template.indent([
                    `shareScopeName: name,`,
                    `webpackRequire: ${RuntimeGlobals.require},`,
                    `initPromises: initPromises,`,
                    `initTokens: initTokens,`,
                    `initScope: initScope,`,
                ])}`,
                '})',
            ])};`,
        ]);
    }
}
exports.default = ShareRuntimeModule;
//# sourceMappingURL=ShareRuntimeModule.js.map