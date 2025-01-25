"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const request_1 = __importDefault(require("../../../request/request"));
describe('request - Provided for "http.IncomingMessage" (accepts arguments and returns expected values)', () => {
    test('req.aborted can be provided', () => {
        const req = (0, request_1.default)({ aborted: provided_1.providedBoolean });
        expect(req.aborted).toBeDefined();
        expect(req.aborted).toBe(provided_1.providedBoolean);
    });
    test('req.httpVersion can be provided', () => {
        const req = (0, request_1.default)({ httpVersion: provided_1.providedString });
        expect(req.httpVersion).toBeDefined();
        expect(req.httpVersion).toBe(provided_1.providedString);
    });
    test('req.httpVersionMajor can be provided', () => {
        const req = (0, request_1.default)({ httpVersionMajor: provided_1.providedNumber });
        expect(req.httpVersionMajor).toBeDefined();
        expect(req.httpVersionMajor).toBe(provided_1.providedNumber);
    });
    test('req.httpVersionMinor can be provided', () => {
        const req = (0, request_1.default)({ httpVersionMinor: provided_1.providedNumber });
        expect(req.httpVersionMinor).toBeDefined();
        expect(req.httpVersionMinor).toBe(provided_1.providedNumber);
    });
    test('req.complete can be provided', () => {
        const req = (0, request_1.default)({ complete: provided_1.providedBoolean });
        expect(req.complete).toBeDefined();
        expect(req.complete).toBe(provided_1.providedBoolean);
    });
    test('req.connection can be provided', () => {
        const req = (0, request_1.default)({ connection: provided_1.providedSocket });
        expect(req.connection).toBeDefined();
        expect(req.connection).toBe(provided_1.providedSocket);
    });
    test('req.socket can be provided', () => {
        const req = (0, request_1.default)({ socket: provided_1.providedSocket });
        expect(req.socket).toBeDefined();
        expect(req.socket).toBe(provided_1.providedSocket);
    });
    test('req.headers can be provided', () => {
        const req = (0, request_1.default)({ headers: provided_1.providedParams });
        expect(req.headers).toBeDefined();
        expect(req.headers).toBe(provided_1.providedParams);
    });
    test('req.rawHeaders can be provided', () => {
        const req = (0, request_1.default)({ rawHeaders: provided_1.providedStringArray });
        expect(req.rawHeaders).toBeDefined();
        expect(req.rawHeaders).toBe(provided_1.providedStringArray);
    });
    test('req.trailers can be provided', () => {
        const req = (0, request_1.default)({ trailers: provided_1.providedStringObject });
        expect(req.trailers).toBeDefined();
        expect(req.trailers).toBe(provided_1.providedStringObject);
    });
    test('req.rawTrailers can be provided', () => {
        const req = (0, request_1.default)({ rawTrailers: provided_1.providedStringArray });
        expect(req.rawTrailers).toBeDefined();
        expect(req.rawTrailers).toBe(provided_1.providedStringArray);
    });
    test('req.setTimeout can be provided', () => {
        const req = (0, request_1.default)({ setTimeout: provided_1.providedFunction });
        expect(req.setTimeout).toBeDefined();
        expect(req.setTimeout).toBe(provided_1.providedFunction);
    });
    test('req.statusCode can be provided', () => {
        const req = (0, request_1.default)({ statusCode: provided_1.providedNumber });
        expect(req.statusCode).toBeDefined();
        expect(req.statusCode).toBe(provided_1.providedNumber);
    });
    test('req.statusMessage can be provided', () => {
        const req = (0, request_1.default)({ statusMessage: provided_1.providedString });
        expect(req.statusMessage).toBeDefined();
        expect(req.statusMessage).toBe(provided_1.providedString);
    });
    test('req.destroy can be provided', () => {
        const req = (0, request_1.default)({ destroy: provided_1.providedFunction });
        expect(req.destroy).toBeDefined();
        expect(req.destroy).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.http.IncomingMessage.test.js.map