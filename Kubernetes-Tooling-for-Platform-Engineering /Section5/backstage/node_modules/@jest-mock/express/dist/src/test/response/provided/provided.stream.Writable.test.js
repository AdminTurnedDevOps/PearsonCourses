"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const response_1 = __importDefault(require("../../../response/response"));
describe('response - Provided for "stream.Writable" (accepts arguments and returns expected values)', () => {
    test('res.writable can be provided', () => {
        const { res } = (0, response_1.default)({ writable: provided_1.providedBoolean });
        expect(res.writable).toBeDefined();
        expect(res.writable).toBe(provided_1.providedBoolean);
    });
    test('res.writableEnded can be provided', () => {
        const { res } = (0, response_1.default)({ writableEnded: provided_1.providedBoolean });
        expect(res.writableEnded).toBeDefined();
        expect(res.writableEnded).toBe(provided_1.providedBoolean);
    });
    test('res.writableFinished can be provided', () => {
        const { res } = (0, response_1.default)({ writableFinished: provided_1.providedBoolean });
        expect(res.writableFinished).toBeDefined();
        expect(res.writableFinished).toBe(provided_1.providedBoolean);
    });
    test('res.writableHighWaterMark can be provided', () => {
        const { res } = (0, response_1.default)({ writableHighWaterMark: provided_1.providedNumber });
        expect(res.writableHighWaterMark).toBeDefined();
        expect(res.writableHighWaterMark).toBe(provided_1.providedNumber);
    });
    test('res.writableLength can be provided', () => {
        const { res } = (0, response_1.default)({ writableLength: provided_1.providedNumber });
        expect(res.writableLength).toBeDefined();
        expect(res.writableLength).toBe(provided_1.providedNumber);
    });
    test('res.writableObjectMode can be provided', () => {
        const { res } = (0, response_1.default)({ writableObjectMode: provided_1.providedBoolean });
        expect(res.writableObjectMode).toBeDefined();
        expect(res.writableObjectMode).toBe(provided_1.providedBoolean);
    });
    test('res.writableCorked can be provided', () => {
        const { res } = (0, response_1.default)({ writableCorked: provided_1.providedNumber });
        expect(res.writableCorked).toBeDefined();
        expect(res.writableCorked).toBe(provided_1.providedNumber);
    });
    test('res.destroyed can be provided', () => {
        const { res } = (0, response_1.default)({ destroyed: provided_1.providedBoolean });
        expect(res.destroyed).toBeDefined();
        expect(res.destroyed).toBe(provided_1.providedBoolean);
    });
    test('res._write can be provided', () => {
        const { res } = (0, response_1.default)({ _write: provided_1.providedFunction });
        expect(res._write).toBeDefined();
        expect(res._write).toBe(provided_1.providedFunction);
    });
    test('res._writev can be provided', () => {
        const { res } = (0, response_1.default)({ _writev: provided_1.providedFunction });
        expect(res._writev).toBeDefined();
        expect(res._writev).toBe(provided_1.providedFunction);
    });
    test('res._destroy can be provided', () => {
        const { res } = (0, response_1.default)({ _destroy: provided_1.providedFunction });
        expect(res._destroy).toBeDefined();
        expect(res._destroy).toBe(provided_1.providedFunction);
    });
    test('res._final can be provided', () => {
        const { res } = (0, response_1.default)({ _final: provided_1.providedFunction });
        expect(res._final).toBeDefined();
        expect(res._final).toBe(provided_1.providedFunction);
    });
    test('res.write can be provided', () => {
        const { res } = (0, response_1.default)({ write: provided_1.providedFunction });
        expect(res.write).toBeDefined();
        expect(res.write).toBe(provided_1.providedFunction);
    });
    test('res.setDefaultEncoding can be provided', () => {
        const { res } = (0, response_1.default)({ setDefaultEncoding: provided_1.providedFunction });
        expect(res.setDefaultEncoding).toBeDefined();
        expect(res.setDefaultEncoding).toBe(provided_1.providedFunction);
    });
    test('res.end can be provided', () => {
        const { res } = (0, response_1.default)({ end: provided_1.providedFunction });
        expect(res.end).toBeDefined();
        expect(res.end).toBe(provided_1.providedFunction);
    });
    test('res.cork can be provided', () => {
        const { res } = (0, response_1.default)({ cork: provided_1.providedFunction });
        expect(res.cork).toBeDefined();
        expect(res.cork).toBe(provided_1.providedFunction);
    });
    test('res.uncork can be provided', () => {
        const { res } = (0, response_1.default)({ uncork: provided_1.providedFunction });
        expect(res.uncork).toBeDefined();
        expect(res.uncork).toBe(provided_1.providedFunction);
    });
    test('res.destroy can be provided', () => {
        const { res } = (0, response_1.default)({ destroy: provided_1.providedFunction });
        expect(res.destroy).toBeDefined();
        expect(res.destroy).toBe(provided_1.providedFunction);
    });
    test('res.addListener can be provided', () => {
        const { res } = (0, response_1.default)({ addListener: provided_1.providedFunction });
        expect(res.addListener).toBeDefined();
        expect(res.addListener).toBe(provided_1.providedFunction);
    });
    test('res.emit can be provided', () => {
        const { res } = (0, response_1.default)({ emit: provided_1.providedFunction });
        expect(res.emit).toBeDefined();
        expect(res.emit).toBe(provided_1.providedFunction);
    });
    test('res.on can be provided', () => {
        const { res } = (0, response_1.default)({ on: provided_1.providedFunction });
        expect(res.on).toBeDefined();
        expect(res.on).toBe(provided_1.providedFunction);
    });
    test('res.once can be provided', () => {
        const { res } = (0, response_1.default)({ once: provided_1.providedFunction });
        expect(res.once).toBeDefined();
        expect(res.once).toBe(provided_1.providedFunction);
    });
    test('res.prependListener can be provided', () => {
        const { res } = (0, response_1.default)({ prependListener: provided_1.providedFunction });
        expect(res.prependListener).toBeDefined();
        expect(res.prependListener).toBe(provided_1.providedFunction);
    });
    test('res.prependOnceListener can be provided', () => {
        const { res } = (0, response_1.default)({ prependOnceListener: provided_1.providedFunction });
        expect(res.prependOnceListener).toBeDefined();
        expect(res.prependOnceListener).toBe(provided_1.providedFunction);
    });
    test('res.removeListener can be provided', () => {
        const { res } = (0, response_1.default)({ removeListener: provided_1.providedFunction });
        expect(res.removeListener).toBeDefined();
        expect(res.removeListener).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.stream.Writable.test.js.map