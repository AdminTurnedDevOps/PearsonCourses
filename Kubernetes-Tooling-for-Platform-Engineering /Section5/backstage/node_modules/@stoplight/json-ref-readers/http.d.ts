import { RequestInit } from 'node-fetch';
import * as URI from 'urijs';
export declare class OpenError extends Error {
    readonly name = "OpenError";
}
export declare class NetworkError extends Error {
    readonly name = "ReadError";
}
export declare function resolveHttp(ref: URI, opts?: RequestInit): Promise<string>;
export declare function createResolveHttp(defaultRequestOptions?: RequestInit): typeof resolveHttp;
