import { Document } from '@stoplight/spectral-core';
import type { Spectral, IRunOpts } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { ResolverOptions } from './resolver';
import type { Input, Diagnostic } from './types';
export interface ValidateOptions extends IRunOpts {
    source?: string;
    allowedSeverity?: {
        error?: boolean;
        warning?: boolean;
        info?: boolean;
        hint?: boolean;
    };
    __unstable?: {
        resolver?: Omit<ResolverOptions, 'cache'>;
    };
}
export interface ValidateOutput {
    validated: unknown;
    diagnostics: Diagnostic[];
    extras: {
        document: Document;
    };
}
export declare function validate(parser: Parser, parserSpectral: Spectral, asyncapi: Input, options?: ValidateOptions): Promise<ValidateOutput>;
