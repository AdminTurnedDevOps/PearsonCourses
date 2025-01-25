import type { Compiler } from 'webpack';
interface Options {
    asyncChunkLoading?: boolean;
}
declare class StartupChunkDependenciesPlugin {
    asyncChunkLoading: boolean;
    constructor(options: Options);
    private isEnabledForChunk;
    apply(compiler: Compiler): void;
}
export default StartupChunkDependenciesPlugin;
