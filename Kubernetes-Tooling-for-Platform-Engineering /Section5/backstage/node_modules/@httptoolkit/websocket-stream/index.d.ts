// Type definitions for @httptoolkit/websocket-stream 6
// Project: https://github.com/httptoolkit/websocket-stream#readme
// Original definitions by: Ben Burns <https://github.com/benjamincburns>

import * as WebSocket from 'ws';
import { Duplex } from 'stream';
import * as http from 'http';

declare namespace WebSocketStream {
  type WebSocketDuplex = Duplex & {
    socket: WebSocket;
    on(event: 'ws-close', listener: (close: WebSocket.CloseEvent) => void): WebSocketDuplex;
  };

  class Server extends WebSocket.Server {
    on(event: 'connection', cb: (this: WebSocket.Server, socket: WebSocket, request: http.IncomingMessage) => void): this;
    on(event: 'error', cb: (this: WebSocket.Server, error: Error) => void): this;
    on(event: 'headers', cb: (this: WebSocket.Server, headers: string[], request: http.IncomingMessage) => void): this;
    on(event: 'listening', cb: (this: WebSocket.Server) => void): this;
    on(event: 'stream', cb: (this: WebSocket.Server, stream: WebSocketDuplex, request: http.IncomingMessage) => void): this;
    on(event: string | symbol, listener: (this: WebSocket.Server, ...args: any[]) => void): this;
  }

  function createServer(opts?: WebSocket.ServerOptions, callback?: () => void): Server;
}

declare function WebSocketStream(target: string | WebSocket, options?: ClientOptions): WebSocketStream.WebSocketDuplex;
declare function WebSocketStream(target: string | WebSocket, protocols?: string | string[], options?: ClientOptions): WebSocketStream.WebSocketDuplex;

interface ClientOptions extends WebSocket.ClientOptions {
  browserBufferSize?: number;
  browserBufferTimeout?: number;
  objectMode?: boolean;
  binary?: boolean;
}

export = WebSocketStream;
