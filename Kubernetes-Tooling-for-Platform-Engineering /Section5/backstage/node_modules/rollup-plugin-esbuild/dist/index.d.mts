import { Plugin } from 'rollup';
import { TransformOptions, BuildOptions, Loader } from 'esbuild';
import { FilterPattern } from '@rollup/pluginutils';

declare type MarkOptional<Type, Keys extends keyof Type> = Type extends Type ? Omit<Type, Keys> & Partial<Pick<Type, Keys>> : never;

type Options$1 = Omit<TransformOptions, 'sourcemap'> & {
    sourceMap?: boolean;
};
declare const minify: ({ sourceMap, ...options }?: Options$1) => Plugin;

type OptimizeDepsOptions = {
    include: string[];
    exclude?: string[];
    cwd: string;
    esbuildOptions?: BuildOptions;
    sourceMap: boolean;
};

type Options = Omit<TransformOptions, 'sourcemap' | 'loader'> & {
    include?: FilterPattern;
    exclude?: FilterPattern;
    sourceMap?: boolean;
    optimizeDeps?: MarkOptional<OptimizeDepsOptions, 'cwd' | 'sourceMap'>;
    /**
     * Use this tsconfig file instead
     * Disable it by setting to `false`
     */
    tsconfig?: string | false;
    /**
     * Map extension to esbuild loader
     * Note that each entry (the extension) needs to start with a dot
     */
    loaders?: {
        [ext: string]: Loader | false;
    };
};
declare const _default: ({ include, exclude, sourceMap, optimizeDeps, tsconfig, loaders: _loaders, ...esbuildOptions }?: Options) => Plugin;

export { Options, _default as default, minify };
