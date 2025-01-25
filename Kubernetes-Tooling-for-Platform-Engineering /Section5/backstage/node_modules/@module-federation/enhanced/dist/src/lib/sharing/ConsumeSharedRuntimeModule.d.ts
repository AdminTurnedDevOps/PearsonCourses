declare const RuntimeModule: typeof import("webpack").RuntimeModule;
declare class ConsumeSharedRuntimeModule extends RuntimeModule {
    private _runtimeRequirements;
    /**
     * @param {ReadonlySet<string>} runtimeRequirements runtime requirements
     */
    constructor(runtimeRequirements: ReadonlySet<string>);
    /**
     * @returns {string | null} runtime code
     */
    generate(): string | null;
}
export default ConsumeSharedRuntimeModule;
