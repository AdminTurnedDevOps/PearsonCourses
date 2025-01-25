import type { WebpackPluginInstance, Compiler } from 'webpack';
export default class HoistContainerReferencesPlugin implements WebpackPluginInstance {
    name: string;
    constructor();
    apply(compiler: Compiler): void;
}
