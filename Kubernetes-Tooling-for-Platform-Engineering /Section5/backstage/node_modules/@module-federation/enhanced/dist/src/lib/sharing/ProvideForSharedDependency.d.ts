declare const dependencies: typeof import("webpack").dependencies;
declare class ProvideForSharedDependency extends dependencies.ModuleDependency {
    /**
     *
     * @param request request string
     */
    constructor(request: string);
    get type(): string;
    get category(): string;
}
export default ProvideForSharedDependency;
