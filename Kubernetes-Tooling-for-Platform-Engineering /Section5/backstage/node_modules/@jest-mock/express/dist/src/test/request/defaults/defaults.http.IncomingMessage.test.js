"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tested Module
const request_1 = __importDefault(require("../../../request/request"));
describe('request - Defaults from "http.IncomingMessage" (accepts no arguments and return default values)', () => {
    test('req.aborted is a boolean', () => {
        const req = (0, request_1.default)();
        expect(req.aborted).toBeDefined();
        expect(req.aborted).toBe(false);
    });
    test('req.httpVersion is an empty string', () => {
        const req = (0, request_1.default)();
        expect(req.httpVersion).toBeDefined();
        expect(req.httpVersion).toBe('');
    });
    test('req.httpVersionMajor is a number', () => {
        const req = (0, request_1.default)();
        expect(req.httpVersionMajor).toBeDefined();
        expect(req.httpVersionMajor).toBe(0);
    });
    test('req.httpVersionMinor is a number', () => {
        const req = (0, request_1.default)();
        expect(req.httpVersionMinor).toBeDefined();
        expect(req.httpVersionMinor).toBe(0);
    });
    test('req.complete is a boolean', () => {
        const req = (0, request_1.default)();
        expect(req.complete).toBeDefined();
        expect(req.complete).toBe(false);
    });
    test('req.connection is an empty object', () => {
        const req = (0, request_1.default)();
        expect(req.connection).toBeDefined();
        expect(req.connection).toBeInstanceOf(Object);
        expect(Object.keys(req.connection).length).toBe(0);
    });
    test('req.socket is an empty object', () => {
        const req = (0, request_1.default)();
        expect(req.socket).toBeDefined();
        expect(req.socket).toBeInstanceOf(Object);
        expect(Object.keys(req.socket).length).toBe(0);
    });
    test('req.headers is an empty object', () => {
        const req = (0, request_1.default)();
        expect(req.headers).toBeDefined();
        expect(req.headers).toBeInstanceOf(Object);
        expect(Object.keys(req.headers).length).toBe(0);
    });
    test('req.rawHeaders is an empty array', () => {
        const req = (0, request_1.default)();
        expect(req.rawHeaders).toBeDefined();
        expect(Array.isArray(req.rawHeaders)).toBe(true);
        expect(req.rawHeaders.length).toBe(0);
    });
    test('req.trailers is an empty object', () => {
        const req = (0, request_1.default)();
        expect(req.trailers).toBeDefined();
        expect(req.trailers).toBeInstanceOf(Object);
        expect(Object.keys(req.trailers).length).toBe(0);
    });
    test('req.rawTrailers is an empty array', () => {
        const req = (0, request_1.default)();
        expect(req.rawTrailers).toBeDefined();
        expect(Array.isArray(req.rawTrailers)).toBe(true);
        expect(req.rawTrailers.length).toBe(0);
    });
    test('req.setTimeout is a mocked function', () => {
        const req = (0, request_1.default)();
        expect(req.setTimeout).toBeDefined();
        expect(typeof req.setTimeout).toBe('function');
        expect(req.setTimeout.getMockName()).toBe('setTimeout mock default');
    });
    test('req.statusCode is a number', () => {
        const req = (0, request_1.default)();
        expect(req.statusCode).toBeDefined();
        expect(req.statusCode).toBe(0);
    });
    test('req.statusMessage is an empty string', () => {
        const req = (0, request_1.default)();
        expect(req.statusMessage).toBeDefined();
        expect(req.statusMessage).toBe('');
    });
    test('req.destroy is a mocked function', () => {
        const req = (0, request_1.default)();
        expect(req.destroy).toBeDefined();
        expect(typeof req.destroy).toBe('function');
        expect(req.destroy.getMockName()).toBe('destroy mock default');
    });
});
//# sourceMappingURL=defaults.http.IncomingMessage.test.js.map