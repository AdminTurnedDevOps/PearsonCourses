import type { WebpackOptions, Compilation, UpdateHashContext, CodeGenerationContext, CodeGenerationResult, LibIdentOptions, NeedBuildContext, RequestShortener, ResolverWithOptions, WebpackError, ObjectDeserializerContext, ObjectSerializerContext, Hash, InputFileSystem } from 'webpack/lib/Module';
declare const Module: typeof import("webpack").Module;
export type ConsumeOptions = {
    /**
     * fallback request
     */
    import?: string | undefined;
    /**
     * resolved fallback request
     */
    importResolved?: string | undefined;
    /**
     * global share key
     */
    shareKey: string;
    /**
     * share scope
     */
    shareScope: string;
    /**
     * version requirement
     */
    requiredVersion: import('webpack/lib/util/semver').SemVerRange | false | undefined;
    /**
     * package name to determine required version automatically
     */
    packageName: string;
    /**
     * don't use shared version even if version isn't valid
     */
    strictVersion: boolean;
    /**
     * use single global version
     */
    singleton: boolean;
    /**
     * include the fallback module in a sync way
     */
    eager: boolean;
};
declare class ConsumeSharedModule extends Module {
    options: ConsumeOptions;
    /**
     * @param {string} context context
     * @param {ConsumeOptions} options consume options
     */
    constructor(context: string, options: ConsumeOptions);
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
     * @returns {Set<string>} types available (do not mutate)
     */
    getSourceTypes(): Set<string>;
    /**
     * @param {string=} type the source type for which the size should be estimated
     * @returns {number} the estimated size of the module (must be non-zero)
     */
    size(type?: string): number;
    /**
     * @param {Hash} hash the hash used to track dependencies
     * @param {UpdateHashContext} context context
     * @returns {void}
     */
    updateHash(hash: Hash, context: UpdateHashContext): void;
    /**
     * @param {CodeGenerationContext} context context for code generation
     * @returns {CodeGenerationResult} result
     */
    codeGeneration({ chunkGraph, moduleGraph, runtimeTemplate, }: CodeGenerationContext): CodeGenerationResult;
    /**
     * @param {ObjectSerializerContext} context context
     */
    serialize(context: ObjectSerializerContext): void;
    /**
     * @param {ObjectDeserializerContext} context context
     */
    deserialize(context: ObjectDeserializerContext): void;
}
export default ConsumeSharedModule;
