/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="node" />
import type { IncomingMessage } from 'http';
import type { Readable } from 'stream';
import type { Request } from 'express';
import type { EventEventEmitter } from '../index';
interface StreamReadable extends EventEventEmitter {
    readable?: Readable['readable'];
    readableHighWaterMark?: Readable['readableHighWaterMark'];
    readableLength?: Readable['readableLength'];
    readableObjectMode?: Readable['readableObjectMode'];
    destroyed?: Readable['destroyed'];
    _read?: jest.Mock;
    read?: jest.Mock;
    setEncoding?: jest.Mock;
    pause?: jest.Mock;
    resume?: jest.Mock;
    isPaused?: jest.Mock;
    unpipe?: jest.Mock;
    unshift?: jest.Mock;
    wrap?: jest.Mock;
    push?: jest.Mock;
    _destroy?: jest.Mock;
    addListener?: jest.Mock;
    emit?: jest.Mock;
    on?: jest.Mock;
    once?: jest.Mock;
    prependListener?: jest.Mock;
    prependOnceListener?: jest.Mock;
    removeListener?: jest.Mock;
    destroy?: jest.Mock;
}
interface HttpIncomingMessage extends StreamReadable {
    aborted?: IncomingMessage['aborted'];
    httpVersion?: IncomingMessage['httpVersion'];
    httpVersionMajor?: IncomingMessage['httpVersionMajor'];
    httpVersionMinor?: IncomingMessage['httpVersionMinor'];
    complete?: IncomingMessage['complete'];
    connection?: Partial<IncomingMessage['connection']> | null;
    socket?: Partial<IncomingMessage['socket']> | null;
    headers?: Partial<IncomingMessage['headers']>;
    rawHeaders?: IncomingMessage['rawHeaders'];
    trailers?: IncomingMessage['trailers'];
    rawTrailers?: IncomingMessage['rawTrailers'];
    setTimeout?: jest.Mock;
    statusCode?: IncomingMessage['statusCode'];
    statusMessage?: IncomingMessage['statusMessage'];
    destroy?: jest.Mock;
}
export interface MockRequest extends HttpIncomingMessage {
    params?: Request['params'];
    query?: Request['query'];
    body?: Request['body'];
    cookies?: Request['cookies'];
    method?: Request['method'];
    protocol?: Request['protocol'];
    secure?: Request['secure'];
    ip?: Request['ip'];
    ips?: Request['ips'];
    subdomains?: Request['subdomains'];
    path?: Request['path'];
    hostname?: Request['hostname'];
    host?: Request['host'];
    fresh?: Request['fresh'];
    stale?: Request['stale'];
    xhr?: Request['xhr'];
    route?: Request['route'];
    signedCookies?: Request['signedCookies'];
    originalUrl?: Request['originalUrl'];
    url?: Request['url'];
    baseUrl?: Request['baseUrl'];
    accepted?: Request['accepted'];
    get?: jest.Mock;
    header?: jest.Mock;
    accepts?: jest.Mock;
    acceptsCharsets?: jest.Mock;
    acceptsEncodings?: jest.Mock;
    acceptsLanguages?: jest.Mock;
    range?: jest.Mock;
    param?: jest.Mock;
    is?: jest.Mock;
    app?: Partial<Request['app']>;
    res?: Partial<Request['res']>;
    next?: jest.Mock;
    [key: string]: any;
}
export {};
