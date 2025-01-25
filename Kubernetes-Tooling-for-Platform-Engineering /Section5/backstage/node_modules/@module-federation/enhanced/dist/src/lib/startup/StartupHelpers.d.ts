import type { Compilation, Chunk, ChunkGraph } from 'webpack';
import type { EntryModuleWithChunkGroup } from 'webpack/lib/ChunkGraph';
import type RuntimeTemplate from 'webpack/lib/RuntimeTemplate';
export declare const federationStartup = "federation-entry-startup";
export declare const generateEntryStartup: (compilation: Compilation, chunkGraph: ChunkGraph, runtimeTemplate: RuntimeTemplate, entries: EntryModuleWithChunkGroup[], chunk: Chunk, passive: boolean) => string;
export declare const generateESMEntryStartup: (compilation: Compilation, chunkGraph: ChunkGraph, runtimeTemplate: RuntimeTemplate, entries: EntryModuleWithChunkGroup[], chunk: Chunk, passive: boolean) => string;
