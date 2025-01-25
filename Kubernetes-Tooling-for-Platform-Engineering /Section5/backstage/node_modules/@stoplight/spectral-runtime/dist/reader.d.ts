/// <reference types="node" />
import type { Agent } from 'http';
export interface IFileReadOptions {
    encoding: 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';
}
export interface IReadOptions extends IFileReadOptions {
    timeout?: number;
    agent?: Agent;
}
export declare function readFile(name: string, opts: IReadOptions): Promise<string>;
export declare function readParsable(name: string, opts: IReadOptions): Promise<string>;
