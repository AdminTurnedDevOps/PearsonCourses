import type { Compilation } from 'webpack';
import type WebpackError from 'webpack/lib/WebpackError';
import type { CodeGenerationContext, CodeGenerationResult, LibIdentOptions, NeedBuildContext, RequestShortener, ResolverWithOptions, ObjectDeserializerContext, ObjectSerializerContext } from 'webpack/lib/Module';
import type { InputFileSystem } from 'webpack/lib/util/fs';
import type { WebpackOptionsNormalized as WebpackOptions } from 'webpack/declarations/WebpackOptions';
declare const Module: typeof import("webpack").Module;
/**
 * @class
 * @extends {Module}
 */
declare class ProvideSharedModule extends Module {
    private _shareScope;
    private _name;
    private _version;
    private _request;
    private _eager;
    private _requiredVersion;
    private _strictVersion;
    private _singleton;
    /**
     * @constructor
     * @param {string} shareScope shared scope name
     * @param {string} name shared key
     * @param {string | false} version version
     * @param {string} request request to the provided module
     * @param {boolean} eager include the module in sync way
     * @param {boolean} requiredVersion version requirement
     * @param {boolean} strictVersion don't use shared version even if version isn't valid
     * @param {boolean} singleton use single global version
     */
    constructor(shareScope: string, name: string, version: string | false, request: string, eager: boolean, requiredVersion: string | false, strictVersion: boolean, singleton: boolean);
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
     * @param {NeedBuildContext} context context info
     * @param {function((WebpackError | null)=, boolean=): void} callback callback function, returns true, if the module needs a rebuild
     * @returns {void}
     */
    needBuild(context: NeedBuildContext, callback: (error?: WebpackError | null, needsRebuild?: boolean) => void): void;
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
     * @returns {ProvideSharedModule} deserialize fallback dependency
     */
    static deserialize(context: ObjectDeserializerContext): ProvideSharedModule;
}
export default ProvideSharedModule;
