/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="node" />
import type { ServerResponse, OutgoingMessage, IncomingMessage } from 'http';
import type { Writable } from 'stream';
import type { Response } from 'express';
import type { EventEventEmitter } from '../index';
interface StreamWritable extends EventEventEmitter {
    writable?: Writable['writable'];
    writableEnded?: Writable['writableEnded'];
    writableFinished?: Writable['writableFinished'];
    writableHighWaterMark?: Writable['writableHighWaterMark'];
    writableLength?: Writable['writableLength'];
    writableObjectMode?: Writable['writableObjectMode'];
    writableCorked?: Writable['writableCorked'];
    destroyed?: Writable['destroyed'];
    _write?: jest.Mock;
    _writev?: jest.Mock;
    _destroy?: jest.Mock;
    _final?: jest.Mock;
    write?: jest.Mock;
    setDefaultEncoding?: jest.Mock;
    end?: jest.Mock;
    cork?: jest.Mock;
    uncork?: jest.Mock;
    destroy?: jest.Mock;
    addListener?: jest.Mock;
    emit?: jest.Mock;
    on?: jest.Mock;
    once?: jest.Mock;
    prependListener?: jest.Mock;
    prependOnceListener?: jest.Mock;
    removeListener?: jest.Mock;
}
interface HttpOutgoingMessage extends StreamWritable {
    req?: Partial<IncomingMessage>;
    chunkedEncoding?: OutgoingMessage['chunkedEncoding'];
    shouldKeepAlive?: OutgoingMessage['shouldKeepAlive'];
    useChunkedEncodingByDefault?: OutgoingMessage['useChunkedEncodingByDefault'];
    sendDate?: OutgoingMessage['sendDate'];
    finished?: OutgoingMessage['finished'];
    headersSent?: OutgoingMessage['headersSent'];
    connection?: Partial<OutgoingMessage['connection']>;
    socket?: Partial<OutgoingMessage['socket']>;
    setTimeout?: jest.Mock;
    setHeader?: jest.Mock;
    getHeader?: jest.Mock;
    getHeaders?: jest.Mock;
    getHeaderNames?: jest.Mock;
    hasHeader?: jest.Mock;
    removeHeader?: jest.Mock;
    addTrailers?: jest.Mock;
    flushHeaders?: jest.Mock;
}
interface HttpServerResponse extends HttpOutgoingMessage {
    statusCode?: ServerResponse['statusCode'];
    statusMessage?: ServerResponse['statusMessage'];
    assignSocket?: jest.Mock;
    detachSocket?: jest.Mock;
    writeContinue?: jest.Mock;
    writeHead?: jest.Mock;
    writeProcessing?: jest.Mock;
}
export interface MockResponse extends HttpServerResponse {
    status?: jest.Mock;
    sendStatus?: jest.Mock;
    links?: jest.Mock;
    send?: jest.Mock;
    json?: jest.Mock;
    jsonp?: jest.Mock;
    sendFile?: jest.Mock;
    sendfile?: jest.Mock;
    download?: jest.Mock;
    contentType?: jest.Mock;
    type?: jest.Mock;
    format?: jest.Mock;
    attachment?: jest.Mock;
    set?: jest.Mock;
    header?: jest.Mock;
    headersSent?: Response['headersSent'];
    get?: jest.Mock;
    clearCookie?: jest.Mock;
    cookie?: jest.Mock;
    location?: jest.Mock;
    redirect?: jest.Mock;
    render?: jest.Mock;
    locals?: Partial<Response['locals']>;
    charset?: Response['charset'];
    vary?: jest.Mock;
    app?: Partial<Response['app']>;
    append?: jest.Mock;
    req?: Partial<Response['req']>;
    [key: string]: any;
}
export {};
