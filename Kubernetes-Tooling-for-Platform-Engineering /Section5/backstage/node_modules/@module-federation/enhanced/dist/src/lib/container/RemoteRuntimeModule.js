"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const utils_1 = require("./runtime/utils");
const extractUrlAndGlobal = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/extractUrlAndGlobal'));
const { Template, RuntimeModule, RuntimeGlobals } = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack'));
class RemoteRuntimeModule extends RuntimeModule {
    constructor() {
        super('remotes loading');
    }
    /**
     * @returns {string | null} runtime code
     */
    generate() {
        const { compilation, chunkGraph } = this;
        const { runtimeTemplate, moduleGraph } = compilation;
        const chunkToRemotesMapping = {};
        const idToExternalAndNameMapping = {};
        const idToRemoteMap = {};
        // let chunkReferences: Set<Chunk> = new Set();
        // if (this.chunk && chunkGraph) {
        //   const requirements = chunkGraph.getTreeRuntimeRequirements(this.chunk);
        //   if (requirements.has('federation-entry-startup')) {
        //     chunkReferences = this.chunk.getAllReferencedChunks();
        //   } else {
        //     // remote entry doesnt need federation startup, can have async chunk map only
        //     chunkReferences = this.chunk.getAllAsyncChunks();
        //   }
        // }
        const allChunks = [
            ...Array.from(this.chunk?.getAllReferencedChunks() || []),
        ];
        for (const chunk of allChunks) {
            const modules = chunkGraph?.getChunkModulesIterableBySourceType(chunk, 'remote');
            if (!modules) {
                continue;
            }
            // @ts-ignore
            const remotes = (chunkToRemotesMapping[chunk.id] = []);
            for (const m of modules) {
                const module = m;
                const name = module.internalRequest;
                // @ts-ignore
                const id = chunkGraph ? chunkGraph.getModuleId(module) : undefined;
                const { shareScope } = module;
                const dep = module.dependencies[0];
                // @ts-ignore
                const externalModule = moduleGraph.getModule(dep);
                const externalModuleId = chunkGraph && externalModule
                    ? // @ts-ignore
                        chunkGraph.getModuleId(externalModule)
                    : undefined;
                if (id !== undefined) {
                    //@ts-ignore
                    remotes.push(id);
                    idToExternalAndNameMapping[id] = [shareScope, name, externalModuleId];
                    const remoteModules = [];
                    // FallbackModule has requests
                    if ('requests' in externalModule && externalModule.requests) {
                        externalModule.dependencies.forEach((dependency) => {
                            const remoteModule = moduleGraph.getModule(dependency);
                            if (remoteModule) {
                                // @ts-ignore
                                remoteModules.push(remoteModule);
                            }
                        });
                    }
                    else {
                        remoteModules.push(externalModule);
                    }
                    idToRemoteMap[id] = [];
                    remoteModules.forEach((remoteModule) => {
                        let remoteName = '';
                        try {
                            const [_url, name] = extractUrlAndGlobal(remoteModule.request);
                            remoteName = name;
                        }
                        catch (err) {
                            //noop
                        }
                        const externalModuleId = chunkGraph &&
                            remoteModule &&
                            // @ts-ignore
                            chunkGraph.getModuleId(remoteModule);
                        idToRemoteMap[id].push({
                            externalType: remoteModule.externalType,
                            name: remoteModule.externalType === 'script' ? remoteName : '',
                            externalModuleId,
                        });
                    });
                }
            }
        }
        const federationGlobal = (0, utils_1.getFederationGlobalScope)(RuntimeGlobals || {});
        return Template.asString([
            `var chunkMapping = ${JSON.stringify(chunkToRemotesMapping, null, '\t')};`,
            `var idToExternalAndNameMapping = ${JSON.stringify(idToExternalAndNameMapping, null, '\t')};`,
            `var idToRemoteMap = ${JSON.stringify(idToRemoteMap, null, '\t')};`,
            `${federationGlobal}.bundlerRuntimeOptions.remotes = {idToRemoteMap,chunkMapping, idToExternalAndNameMapping, webpackRequire:${RuntimeGlobals.require}};`,
            `${RuntimeGlobals.ensureChunkHandlers}.remotes = ${runtimeTemplate.basicFunction('chunkId, promises', [
                `${federationGlobal}.bundlerRuntime.remotes({idToRemoteMap,chunkMapping, idToExternalAndNameMapping, chunkId, promises, webpackRequire:${RuntimeGlobals.require}});`,
            ])}`,
        ]);
    }
}
exports.default = RemoteRuntimeModule;
//# sourceMappingURL=RemoteRuntimeModule.js.map