declare const RuntimeModule: typeof import("webpack").RuntimeModule;
declare class ShareRuntimeModule extends RuntimeModule {
    constructor();
    /**
     * @returns {string | null} runtime code
     */
    generate(): string | null;
}
export default ShareRuntimeModule;
