import type { Compiler } from 'webpack';
import type { containerPlugin } from '@module-federation/sdk';
declare class ContainerPlugin {
    _options: containerPlugin.ContainerPluginOptions;
    name: string;
    constructor(options: containerPlugin.ContainerPluginOptions);
    static patchChunkSplit(compiler: Compiler, name: string): void;
    apply(compiler: Compiler): void;
}
export default ContainerPlugin;
