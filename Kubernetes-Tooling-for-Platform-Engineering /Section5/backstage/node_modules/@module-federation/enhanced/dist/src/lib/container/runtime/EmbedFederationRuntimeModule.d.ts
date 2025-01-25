import ContainerEntryDependency from '../ContainerEntryDependency';
import type FederationRuntimeDependency from './FederationRuntimeDependency';
declare const RuntimeModule: typeof import("webpack").RuntimeModule;
declare class EmbedFederationRuntimeModule extends RuntimeModule {
    private containerEntrySet;
    constructor(containerEntrySet: Set<ContainerEntryDependency | FederationRuntimeDependency>);
    identifier(): string;
    generate(): string | null;
}
export default EmbedFederationRuntimeModule;
