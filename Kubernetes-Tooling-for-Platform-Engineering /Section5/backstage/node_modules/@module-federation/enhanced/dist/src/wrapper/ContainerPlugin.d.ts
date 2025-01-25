import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { containerPlugin } from '@module-federation/sdk';
export default class ContainerPlugin implements WebpackPluginInstance {
    private _options;
    name: string;
    constructor(options: containerPlugin.ContainerPluginOptions);
    apply(compiler: Compiler): void;
}
