import { AsyncAPIDocumentInterface } from './models';
import type { Spectral, Document } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { ResolverOptions } from './resolver';
import type { ValidateOptions } from './validate';
import type { Input, Diagnostic } from './types';
export interface ParseOutput {
    document: AsyncAPIDocumentInterface | undefined;
    diagnostics: Diagnostic[];
    extras?: {
        document: Document;
    };
}
export interface ParseOptions {
    source?: string;
    applyTraits?: boolean;
    parseSchemas?: boolean;
    validateOptions?: Omit<ValidateOptions, 'source'>;
    __unstable?: {
        resolver?: Omit<ResolverOptions, 'cache'>;
    };
}
export declare function parse(parser: Parser, spectral: Spectral, asyncapi: Input, options?: ParseOptions): Promise<ParseOutput>;
