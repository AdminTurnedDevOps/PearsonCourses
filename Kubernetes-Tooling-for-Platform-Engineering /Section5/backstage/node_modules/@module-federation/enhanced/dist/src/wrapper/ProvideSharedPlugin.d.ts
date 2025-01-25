import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { ProvideSharedPluginOptions } from '../declarations/plugins/sharing/ProvideSharedPlugin';
export default class ProvideSharedPlugin implements WebpackPluginInstance {
    private _options;
    name: string;
    constructor(options: ProvideSharedPluginOptions);
    apply(compiler: Compiler): void;
}
