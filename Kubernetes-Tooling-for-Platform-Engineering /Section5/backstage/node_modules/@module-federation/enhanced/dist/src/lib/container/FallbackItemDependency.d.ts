declare const dependencies: typeof import("webpack").dependencies;
declare class FallbackItemDependency extends dependencies.ModuleDependency {
    /**
     * @param {string} request request
     */
    constructor(request: string);
    get type(): string;
    get category(): string;
}
export default FallbackItemDependency;
