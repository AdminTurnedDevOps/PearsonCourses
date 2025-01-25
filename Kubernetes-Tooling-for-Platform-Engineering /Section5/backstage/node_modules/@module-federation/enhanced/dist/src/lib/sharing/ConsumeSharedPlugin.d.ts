import type { Compiler } from 'webpack';
import { ConsumeSharedPluginOptions } from '../../declarations/plugins/sharing/ConsumeSharedPlugin';
declare class ConsumeSharedPlugin {
    private _consumes;
    constructor(options: ConsumeSharedPluginOptions);
    apply(compiler: Compiler): void;
}
export default ConsumeSharedPlugin;
