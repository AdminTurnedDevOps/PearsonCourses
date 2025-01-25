import type { Compiler } from 'webpack';
import { containerReferencePlugin } from '@module-federation/sdk';
declare class ContainerReferencePlugin {
    private _remoteType;
    private _remotes;
    constructor(options: containerReferencePlugin.ContainerReferencePluginOptions);
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
}
export default ContainerReferencePlugin;
