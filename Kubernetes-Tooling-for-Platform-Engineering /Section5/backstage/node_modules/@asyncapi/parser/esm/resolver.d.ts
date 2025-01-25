import { Resolver as SpectralResolver } from '@stoplight/spectral-ref-resolver';
import type Uri from 'urijs';
export interface Resolver {
    schema: 'file' | 'http' | 'https' | string;
    order?: number;
    canRead?: boolean | ((uri: Uri, ctx?: any) => boolean);
    read: (uri: Uri, ctx?: any) => string | undefined | Promise<string | undefined>;
}
export interface ResolverOptions {
    cache?: boolean;
    resolvers?: Array<Resolver>;
}
export declare function createResolver(options?: ResolverOptions): SpectralResolver;
