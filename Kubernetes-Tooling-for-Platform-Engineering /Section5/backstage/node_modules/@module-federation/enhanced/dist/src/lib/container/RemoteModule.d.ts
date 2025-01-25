import type { Compilation, WebpackOptionsNormalized } from 'webpack';
import type { CodeGenerationContext, CodeGenerationResult, LibIdentOptions, NeedBuildContext, WebpackError } from 'webpack/lib/Module';
import type { ResolverWithOptions } from 'webpack/lib/ResolverFactory';
import type { InputFileSystem } from 'webpack/lib/FileSystemInfo';
import type { RequestShortener } from 'webpack/lib/RuntimeModule';
import type { ObjectDeserializerContext } from 'webpack/lib/serialization/ObjectMiddleware';
declare const Module: typeof import("webpack").Module;
declare class RemoteModule extends Module {
    private _identifier;
    request: string;
    externalRequests: string[];
    internalRequest: string;
    shareScope: string;
    /**
     * @param {string} request request string
     * @param {string[]} externalRequests list of external requests to containers
     * @param {string} internalRequest name of exposed module in container
     * @param {string} shareScope the used share scope name
     */
    constructor(request: string, externalRequests: string[], internalRequest: string, shareScope: string);
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
    needBuild(context: NeedBuildContext, callback: (err: WebpackError | null, needsRebuild?: boolean) => void): void;
    /**
     * @param {WebpackOptions} options webpack options
     * @param {Compilation} compilation the compilation
     * @param {ResolverWithOptions} resolver the resolver
     * @param {InputFileSystem} fs the file system
     * @param {function(WebpackError=): void} callback callback function
     * @returns {void}
     */
    build(options: WebpackOptionsNormalized, compilation: Compilation, resolver: ResolverWithOptions, fs: InputFileSystem, callback: (err?: WebpackError | undefined) => void): void;
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
     * @returns {string | null} absolute path which should be used for condition matching (usually the resource path)
     */
    nameForCondition(): string | null;
    /**
     * @param {CodeGenerationContext} context context for code generation
     * @returns {CodeGenerationResult} result
     */
    codeGeneration(context: CodeGenerationContext): CodeGenerationResult;
    serialize(context: any): void;
    /**
     * @param {ObjectDeserializerContext} context context
     * @returns {RemoteModule} deserialized module
     */
    static deserialize(context: ObjectDeserializerContext): RemoteModule;
}
export default RemoteModule;
