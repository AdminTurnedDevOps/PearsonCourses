/**
 * Multipart Parser (Finite State Machine)
 * usage:
 * const multipart = require('./multipart.js');
 * const body = multipart.DemoData(); 							   // raw body
 * const body = Buffer.from(event['body-json'].toString(),'base64'); // AWS case
 * const boundary = multipart.getBoundary(event.params.header['content-type']);
 * const parts = multipart.Parse(body,boundary);
 * each part is:
 * { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
 *  or { name: 'key', data: <Buffer 41 41 41 41 42 42 42 42> }
 */
/// <reference types="node" />
declare type Input = {
    filename?: string;
    name?: string;
    type: string;
    data: Buffer;
};
export declare function parse(multipartBodyBuffer: Buffer, boundary: string): Input[];
export declare function getBoundary(header: string): string;
export declare function DemoData(): {
    body: Buffer;
    boundary: string;
};
export {};
