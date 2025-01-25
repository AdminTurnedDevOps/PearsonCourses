import type { Compiler } from 'webpack';
declare const RuntimeModule: typeof import("webpack").RuntimeModule;
declare class RuntimeModuleChunkPlugin {
    apply(compiler: Compiler): void;
}
declare class CustomRuntimePlugin {
    private entryModule?;
    private bundlerRuntimePath;
    private tempDir;
    constructor(path: string, tempDir: string);
    apply(compiler: Compiler): void;
}
declare class CustomRuntimeModule extends RuntimeModule {
    private readonly entryPath;
    private entryModuleId;
    constructor(entryPath: string, entryModuleId: string | number | undefined);
    identifier(): string;
    generate(): string;
}
export { CustomRuntimePlugin, CustomRuntimeModule, RuntimeModuleChunkPlugin };
