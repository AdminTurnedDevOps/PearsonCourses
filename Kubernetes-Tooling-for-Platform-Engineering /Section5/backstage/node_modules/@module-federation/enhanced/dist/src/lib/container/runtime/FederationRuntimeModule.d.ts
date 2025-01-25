import { NormalizedRuntimeInitOptionsWithOutShared } from '../../../types/runtime';
declare const RuntimeModule: typeof import("webpack").RuntimeModule;
declare class FederationRuntimeModule extends RuntimeModule {
    runtimeRequirements: ReadonlySet<string>;
    containerName: string;
    initOptionsWithoutShared: NormalizedRuntimeInitOptionsWithOutShared;
    constructor(runtimeRequirements: ReadonlySet<string>, containerName: string, initOptionsWithoutShared: NormalizedRuntimeInitOptionsWithOutShared);
    /**
     * @returns {string | null} runtime code
     */
    generate(): string;
}
export default FederationRuntimeModule;
