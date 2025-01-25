import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { ConsumeSharedPluginOptions } from '../declarations/plugins/sharing/ConsumeSharedPlugin';
export default class ConsumeSharedPlugin implements WebpackPluginInstance {
    private _options;
    name: string;
    constructor(options: ConsumeSharedPluginOptions);
    apply(compiler: Compiler): void;
}
