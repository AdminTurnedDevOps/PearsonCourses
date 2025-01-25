import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { SharePluginOptions } from '../declarations/plugins/sharing/SharePlugin';
export default class SharePlugin implements WebpackPluginInstance {
    private _options;
    name: string;
    constructor(options: SharePluginOptions);
    apply(compiler: Compiler): void;
}
