"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries
const net_1 = require("net");
// Tested Module
const response_1 = __importDefault(require("../../../response/response"));
describe('response - Defaults for "http.ServerResponse" (accepts no arguments and return default values)', () => {
    test('res.statusCode is a number', () => {
        const { res } = (0, response_1.default)();
        expect(res.statusCode).toBeDefined();
        expect(res.statusCode).toEqual(0);
    });
    test('res.statusMessage is an empty string', () => {
        const { res } = (0, response_1.default)();
        expect(res.statusMessage).toBeDefined();
        expect(res.statusMessage).toEqual('');
    });
    test('res.assignSocket is a mocked function', () => {
        const { res } = (0, response_1.default)();
        expect(res.assignSocket).toBeDefined();
        expect(typeof res.assignSocket).toBe('function');
        expect(res.assignSocket.getMockName()).toBe('assignSocket mock default');
    });
    test('res.assignSocket is not chainable', () => {
        const { res } = (0, response_1.default)();
        // it does not return itself (is not chainable)
        const socket = new net_1.Socket();
        expect(res.assignSocket(socket)).toBeUndefined();
    });
    test('res.detachSocket is a mocked function', () => {
        const { res } = (0, response_1.default)();
        expect(res.detachSocket).toBeDefined();
        expect(typeof res.detachSocket).toBe('function');
        expect(res.detachSocket.getMockName()).toBe('detachSocket mock default');
    });
    test('res.detachSocket is not chainable', () => {
        const { res } = (0, response_1.default)();
        // it does not return itself (is not chainable)
        const socket = new net_1.Socket();
        expect(res.detachSocket(socket)).toBeUndefined();
    });
    test('res.writeContinue is a mocked function', () => {
        const { res } = (0, response_1.default)();
        expect(res.writeContinue).toBeDefined();
        expect(typeof res.writeContinue).toBe('function');
        expect(res.writeContinue.getMockName()).toBe('writeContinue mock default');
    });
    test('res.writeContinue is not chainable', () => {
        const { res } = (0, response_1.default)();
        // it does not return itself (is not chainable)
        expect(res.writeContinue()).toBeUndefined();
    });
    test('res.writeHead is a mocked function', () => {
        const { res } = (0, response_1.default)();
        expect(res.writeHead).toBeDefined();
        expect(typeof res.writeHead).toBe('function');
        expect(res.writeHead.getMockName()).toBe('writeHead mock default');
    });
    test('res.writeHead is chainable', () => {
        const { res } = (0, response_1.default)();
        // it returns itself (is chainable)
        expect(res.writeHead(200)).toBe(res);
    });
    test('res.writeProcessing is a mocked function', () => {
        const { res } = (0, response_1.default)();
        expect(res.writeProcessing).toBeDefined();
        expect(typeof res.writeProcessing).toBe('function');
        expect(res.writeProcessing.getMockName()).toBe('writeProcessing mock default');
    });
    test('res.writeProcessing is not chainable', () => {
        const { res } = (0, response_1.default)();
        // it does not return itself (is not chainable)
        expect(res.writeProcessing()).toBeUndefined();
    });
});
//# sourceMappingURL=defaults.http.ServerResponse.test.js.map