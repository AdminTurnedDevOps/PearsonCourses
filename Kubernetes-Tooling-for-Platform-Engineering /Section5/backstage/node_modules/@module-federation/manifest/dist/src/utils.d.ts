import { Chunk, Compilation, StatsCompilation, StatsModule } from 'webpack';
import { StatsAssets, moduleFederationPlugin, MetaDataTypes } from '@module-federation/sdk';
export declare function getAssetsByChunkIDs(compilation: Compilation, chunkIDMap: Record<string, Set<string | number>>): Record<string, {
    js: string[];
    css: string[];
}>;
export declare function findChunk(id: string | number, chunks: Set<Chunk>): Chunk | void;
export declare function getSharedModules(stats: StatsCompilation, sharedModules: StatsModule[]): [string, StatsModule][];
export declare function getAssetsByChunk(chunk: Chunk, entryPointNames: Array<string>): StatsAssets;
export declare function assert(condition: any, msg: string): asserts condition;
export declare function error(msg: string | Error | unknown): never;
export declare function isDev(): boolean;
export declare function getFileNameWithOutExt(str: string): string;
export declare function getFileName(manifestOptions?: moduleFederationPlugin.ModuleFederationPluginOptions['manifest']): {
    statsFileName: string;
    manifestFileName: string;
};
export declare function getTypesMetaInfo(pluginOptions: moduleFederationPlugin.ModuleFederationPluginOptions, context: string): MetaDataTypes;
