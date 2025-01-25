declare const dependencies: typeof import("webpack").dependencies;
declare class RemoteToExternalDependency extends dependencies.ModuleDependency {
    /**
     * @param {string} request request
     */
    constructor(request: string);
    get type(): string;
    get category(): string;
}
export default RemoteToExternalDependency;
