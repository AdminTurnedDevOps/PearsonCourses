"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const response_1 = __importDefault(require("../../../response/response"));
describe('response - Provided for "http.ServerResponse" (accepts arguments and returns expected values)', () => {
    test('res.statusCode can be provided', () => {
        const { res } = (0, response_1.default)({ statusCode: provided_1.providedNumber });
        expect(res.statusCode).toBeDefined();
        expect(res.statusCode).toBe(provided_1.providedNumber);
    });
    test('res.statusMessage can be provided', () => {
        const { res } = (0, response_1.default)({ statusMessage: provided_1.providedString });
        expect(res.statusMessage).toBeDefined();
        expect(res.statusMessage).toBe(provided_1.providedString);
    });
    test('res.assignSocket can be provided', () => {
        const { res } = (0, response_1.default)({ assignSocket: provided_1.providedFunction });
        expect(res.assignSocket).toBeDefined();
        expect(res.assignSocket).toBe(provided_1.providedFunction);
    });
    test('res.detachSocket can be provided', () => {
        const { res } = (0, response_1.default)({ detachSocket: provided_1.providedFunction });
        expect(res.detachSocket).toBeDefined();
        expect(res.detachSocket).toBe(provided_1.providedFunction);
    });
    test('res.writeContinue can be provided', () => {
        const { res } = (0, response_1.default)({ writeContinue: provided_1.providedFunction });
        expect(res.writeContinue).toBeDefined();
        expect(res.writeContinue).toBe(provided_1.providedFunction);
    });
    test('res.writeHead can be provided', () => {
        const { res } = (0, response_1.default)({ writeHead: provided_1.providedFunction });
        expect(res.writeHead).toBeDefined();
        expect(res.writeHead).toBe(provided_1.providedFunction);
    });
    test('res.writeProcessing can be provided', () => {
        const { res } = (0, response_1.default)({ writeProcessing: provided_1.providedFunction });
        expect(res.writeProcessing).toBeDefined();
        expect(res.writeProcessing).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.http.ServerResponse.test.js.map