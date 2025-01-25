import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { containerReferencePlugin } from '@module-federation/sdk';
export default class ContainerReferencePlugin implements WebpackPluginInstance {
    private _options;
    name: string;
    constructor(options: containerReferencePlugin.ContainerReferencePluginOptions);
    apply(compiler: Compiler): void;
}
