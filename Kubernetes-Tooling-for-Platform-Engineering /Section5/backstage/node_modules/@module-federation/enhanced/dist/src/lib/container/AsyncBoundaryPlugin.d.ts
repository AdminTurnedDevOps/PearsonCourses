import { moduleFederationPlugin } from '@module-federation/sdk';
import type { Compiler, Compilation, Chunk } from 'webpack';
export type Options = moduleFederationPlugin.AsyncBoundaryOptions;
declare class AsyncEntryStartupPlugin {
    private _options;
    private _runtimeChunks;
    constructor(options?: Options);
    apply(compiler: Compiler): void;
    private _collectRuntimeChunks;
    getChunkByName(compilation: Compilation, dependOn: string[], byname: Set<Chunk>): void;
    private _handleRenderStartup;
    private _getChunkRuntime;
    private _getRemotes;
    private _getShared;
    private _getInitialEntryModules;
    private _getTemplateString;
}
export default AsyncEntryStartupPlugin;
