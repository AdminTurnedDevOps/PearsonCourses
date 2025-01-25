declare const dependencies: typeof import("webpack").dependencies;
declare class ConsumeSharedFallbackDependency extends dependencies.ModuleDependency {
    /**
     * @param {string} request the request
     */
    constructor(request: string);
    get type(): string;
    get category(): string;
}
export default ConsumeSharedFallbackDependency;
