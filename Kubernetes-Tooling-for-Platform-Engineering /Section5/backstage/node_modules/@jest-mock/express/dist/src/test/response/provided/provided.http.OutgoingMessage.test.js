"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const response_1 = __importDefault(require("../../../response/response"));
describe('response - Provided for "http.OutgoingMessage" (accepts arguments and returns expected values)', () => {
    test('res.req can be provided', () => {
        const { res } = (0, response_1.default)({ req: provided_1.providedReq });
        expect(res.req).toBeDefined();
        expect(res.req).toBe(provided_1.providedReq);
    });
    test('res.chunkedEncoding can be provided', () => {
        const { res } = (0, response_1.default)({ chunkedEncoding: provided_1.providedBoolean });
        expect(res.chunkedEncoding).toBeDefined();
        expect(res.chunkedEncoding).toBe(provided_1.providedBoolean);
    });
    test('res.shouldKeepAlive can be provided', () => {
        const { res } = (0, response_1.default)({ shouldKeepAlive: provided_1.providedBoolean });
        expect(res.shouldKeepAlive).toBeDefined();
        expect(res.shouldKeepAlive).toBe(provided_1.providedBoolean);
    });
    test('res.useChunkedEncodingByDefault can be provided', () => {
        const { res } = (0, response_1.default)({ useChunkedEncodingByDefault: provided_1.providedBoolean });
        expect(res.useChunkedEncodingByDefault).toBeDefined();
        expect(res.useChunkedEncodingByDefault).toBe(provided_1.providedBoolean);
    });
    test('res.sendDate can be provided', () => {
        const { res } = (0, response_1.default)({ sendDate: provided_1.providedBoolean });
        expect(res.sendDate).toBeDefined();
        expect(res.sendDate).toBe(provided_1.providedBoolean);
    });
    test('res.finished can be provided', () => {
        const { res } = (0, response_1.default)({ finished: provided_1.providedBoolean });
        expect(res.finished).toBeDefined();
        expect(res.finished).toBe(provided_1.providedBoolean);
    });
    test('res.headersSent can be provided', () => {
        const { res } = (0, response_1.default)({ headersSent: provided_1.providedBoolean });
        expect(res.headersSent).toBeDefined();
        expect(res.headersSent).toBe(provided_1.providedBoolean);
    });
    test('res.connection can be provided', () => {
        const { res } = (0, response_1.default)({ connection: provided_1.providedSocket });
        expect(res.connection).toBeDefined();
        expect(res.connection).toBe(provided_1.providedSocket);
    });
    test('res.socket can be provided', () => {
        const { res } = (0, response_1.default)({ socket: provided_1.providedSocket });
        expect(res.socket).toBeDefined();
        expect(res.socket).toBe(provided_1.providedSocket);
    });
    test('res.setTimeout can be provided', () => {
        const { res } = (0, response_1.default)({ setTimeout: provided_1.providedFunction });
        expect(res.setTimeout).toBeDefined();
        expect(res.setTimeout).toBe(provided_1.providedFunction);
    });
    test('res.setHeader can be provided', () => {
        const { res } = (0, response_1.default)({ setHeader: provided_1.providedFunction });
        expect(res.setHeader).toBeDefined();
        expect(res.setHeader).toBe(provided_1.providedFunction);
    });
    test('res.getHeader can be provided', () => {
        const { res } = (0, response_1.default)({ getHeader: provided_1.providedFunction });
        expect(res.getHeader).toBeDefined();
        expect(res.getHeader).toBe(provided_1.providedFunction);
    });
    test('res.getHeaders can be provided', () => {
        const { res } = (0, response_1.default)({ getHeaders: provided_1.providedFunction });
        expect(res.getHeaders).toBeDefined();
        expect(res.getHeaders).toBe(provided_1.providedFunction);
    });
    test('res.getHeaderNames can be provided', () => {
        const { res } = (0, response_1.default)({ getHeaderNames: provided_1.providedFunction });
        expect(res.getHeaderNames).toBeDefined();
        expect(res.getHeaderNames).toBe(provided_1.providedFunction);
    });
    test('res.hasHeader can be provided', () => {
        const { res } = (0, response_1.default)({ hasHeader: provided_1.providedFunction });
        expect(res.hasHeader).toBeDefined();
        expect(res.hasHeader).toBe(provided_1.providedFunction);
    });
    test('res.removeHeader can be provided', () => {
        const { res } = (0, response_1.default)({ removeHeader: provided_1.providedFunction });
        expect(res.removeHeader).toBeDefined();
        expect(res.removeHeader).toBe(provided_1.providedFunction);
    });
    test('res.addTrailers can be provided', () => {
        const { res } = (0, response_1.default)({ addTrailers: provided_1.providedFunction });
        expect(res.addTrailers).toBeDefined();
        expect(res.addTrailers).toBe(provided_1.providedFunction);
    });
    test('res.flushHeaders can be provided', () => {
        const { res } = (0, response_1.default)({ flushHeaders: provided_1.providedFunction });
        expect(res.flushHeaders).toBeDefined();
        expect(res.flushHeaders).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.http.OutgoingMessage.test.js.map