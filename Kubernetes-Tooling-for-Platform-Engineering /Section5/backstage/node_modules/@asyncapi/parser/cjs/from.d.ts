import { readFile } from 'fs';
import type { RequestInit } from 'node-fetch';
import type { Parser } from './parser';
import type { ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions } from './validate';
import type { Diagnostic } from './types';
interface FromResult {
    parse: (options?: ParseOptions) => Promise<ParseOutput>;
    validate: (options?: ValidateOptions) => Promise<Diagnostic[]>;
}
export declare function fromURL(parser: Parser, source: string, options?: RequestInit): FromResult;
export declare function fromFile(parser: Parser, source: string, options?: Parameters<typeof readFile.__promisify__>[1]): FromResult;
export {};
