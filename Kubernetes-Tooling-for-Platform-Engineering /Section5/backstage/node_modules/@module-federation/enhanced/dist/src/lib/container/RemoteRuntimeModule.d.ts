declare const RuntimeModule: typeof import("webpack").RuntimeModule;
declare class RemoteRuntimeModule extends RuntimeModule {
    constructor();
    /**
     * @returns {string | null} runtime code
     */
    generate(): string | null;
}
export default RemoteRuntimeModule;
