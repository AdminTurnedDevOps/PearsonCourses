import type * as http from 'http';
export type BodyParserLikeRequest = http.IncomingMessage & {
    body: any;
};
/**
 * Fix proxied body if bodyParser is involved.
 */
export declare function fixRequestBody<TReq = http.IncomingMessage>(proxyReq: http.ClientRequest, req: TReq): void;
