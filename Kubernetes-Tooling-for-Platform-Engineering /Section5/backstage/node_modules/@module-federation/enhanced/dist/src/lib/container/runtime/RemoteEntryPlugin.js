"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteEntryPlugin = void 0;
const btoa_1 = __importDefault(require("btoa"));
class RemoteEntryPlugin {
    constructor(name, getPublicPath) {
        this.name = 'VmokRemoteEntryPlugin';
        this._name = name;
        this._getPublicPath = getPublicPath;
    }
    apply(compiler) {
        let code;
        if (!this._getPublicPath.startsWith('function')) {
            code = `${compiler.webpack.RuntimeGlobals.publicPath} = new Function(${JSON.stringify(this._getPublicPath)})()`;
        }
        else {
            code = `(${this._getPublicPath})()`;
        }
        const base64Code = (0, btoa_1.default)(code);
        const dataUrl = `data:text/javascript;base64,${base64Code}`;
        compiler.hooks.afterPlugins.tap('VmokRemoteEntryPlugin', () => {
            new compiler.webpack.EntryPlugin(compiler.context, dataUrl, {
                name: this._name,
            }).apply(compiler);
        });
    }
}
exports.RemoteEntryPlugin = RemoteEntryPlugin;
//# sourceMappingURL=RemoteEntryPlugin.js.map