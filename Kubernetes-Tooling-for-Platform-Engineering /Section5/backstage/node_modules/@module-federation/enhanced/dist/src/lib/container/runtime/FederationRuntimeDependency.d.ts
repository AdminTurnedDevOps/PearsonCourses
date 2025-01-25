declare const ModuleDependency: typeof import("webpack/lib/dependencies/ModuleDependency");
declare class FederationRuntimeDependency extends ModuleDependency {
    constructor(request: string);
    get type(): string;
}
export default FederationRuntimeDependency;
