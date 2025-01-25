import type { WebpackPluginInstance, Compiler } from 'webpack';
import type { Options } from '../lib/container/AsyncBoundaryPlugin';
export default class AsyncBoundaryPlugin implements WebpackPluginInstance {
    private _options;
    name: string;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
