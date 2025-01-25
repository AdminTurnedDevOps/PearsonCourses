import { Stats, Manifest, moduleFederationPlugin } from '@module-federation/sdk';
import type { Compilation, Compiler } from 'webpack';
import { ManifestInfo } from './types';
interface GenerateManifestOptions {
    compilation: Compilation;
    stats: Stats;
    publicPath: string;
    compiler: Compiler;
    bundler: 'webpack' | 'rspack';
    additionalData?: moduleFederationPlugin.PluginManifestOptions['additionalData'];
}
declare class ManifestManager {
    private _options;
    private _manifest?;
    get manifest(): Manifest | undefined;
    init(options: moduleFederationPlugin.ModuleFederationPluginOptions): void;
    get fileName(): string;
    generateManifest(options: GenerateManifestOptions, extraOptions?: {
        disableEmit?: boolean;
    }): Promise<ManifestInfo>;
}
export { ManifestManager };
