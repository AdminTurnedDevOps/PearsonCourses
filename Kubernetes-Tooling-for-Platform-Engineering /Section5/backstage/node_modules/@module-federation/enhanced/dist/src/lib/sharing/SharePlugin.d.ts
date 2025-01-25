import type { Compiler } from 'webpack';
import type { SharePluginOptions } from '../../declarations/plugins/sharing/SharePlugin';
declare class SharePlugin {
    private _shareScope;
    private _consumes;
    private _provides;
    constructor(options: SharePluginOptions);
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
}
export default SharePlugin;
