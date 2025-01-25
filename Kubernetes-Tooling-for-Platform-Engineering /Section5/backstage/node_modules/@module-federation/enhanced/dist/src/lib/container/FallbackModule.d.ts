import type { Chunk, ChunkGraph } from 'webpack';
import type { CodeGenerationContext, CodeGenerationResult, Compilation, InputFileSystem, LibIdentOptions, NeedBuildContext, ObjectDeserializerContext, ObjectSerializerContext, RequestShortener, ResolverWithOptions, WebpackError, WebpackOptions } from 'webpack/lib/Module';
declare const Module: typeof import("webpack").Module;
declare class FallbackModule extends Module {
    requests: string[];
    private _identifier;
    /**
     * @param {string[]} requests list of requests to choose one
     */
    constructor(requests: string[]);
    /**
     * @returns {string} a unique identifier of the module
     */
    identifier(): string;
    /**
     * @param {RequestShortener} requestShortener the request shortener
     * @returns {string} a user readable identifier of the module
     */
    readableIdentifier(requestShortener: RequestShortener): string;
    /**
     * @param {LibIdentOptions} options options
     * @returns {string | null} an identifier for library inclusion
     */
    libIdent(options: LibIdentOptions): string | null;
    /**
     * @param {Chunk} chunk the chunk which condition should be checked
     * @param {Compilation} compilation the compilation
     * @returns {boolean} true, if the chunk is ok for the module
     */
    chunkCondition(chunk: Chunk, { chunkGraph }: {
        chunkGraph: ChunkGraph;
    }): boolean;
    /**
     * @param {NeedBuildContext} context context info
     * @param {function((WebpackError | null)=, boolean=): void} callback callback function, returns true, if the module needs a rebuild
     * @returns {void}
     */
    needBuild(context: NeedBuildContext, callback: (error: WebpackError | null, result?: boolean) => void): void;
    /**
     * @param {WebpackOptions} options webpack options
     * @param {Compilation} compilation the compilation
     * @param {ResolverWithOptions} resolver the resolver
     * @param {InputFileSystem} fs the file system
     * @param {function(WebpackError=): void} callback callback function
     * @returns {void}
     */
    build(options: WebpackOptions, compilation: Compilation, resolver: ResolverWithOptions, fs: InputFileSystem, callback: (error?: WebpackError) => void): void;
    /**
     * @param {string=} type the source type for which the size should be estimated
     * @returns {number} the estimated size of the module (must be non-zero)
     */
    size(type?: string): number;
    /**
     * @returns {Set<string>} types available (do not mutate)
     */
    getSourceTypes(): Set<string>;
    /**
     * @param {CodeGenerationContext} context context for code generation
     * @returns {CodeGenerationResult} result
     */
    codeGeneration({ runtimeTemplate, moduleGraph, chunkGraph, }: CodeGenerationContext): CodeGenerationResult;
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context: ObjectSerializerContext): void;
    /**
     * @param {ObjectDeserializerContext} context context
     * @returns {FallbackModule} deserialized fallback module
     */
    static deserialize(context: ObjectDeserializerContext): FallbackModule;
}
export default FallbackModule;
