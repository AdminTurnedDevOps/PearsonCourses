import type { Compiler, WebpackPluginInstance } from 'webpack';
export declare class RemoteEntryPlugin implements WebpackPluginInstance {
    readonly name = "VmokRemoteEntryPlugin";
    private _name;
    private _getPublicPath;
    constructor(name: string, getPublicPath: string);
    apply(compiler: Compiler): void;
}
