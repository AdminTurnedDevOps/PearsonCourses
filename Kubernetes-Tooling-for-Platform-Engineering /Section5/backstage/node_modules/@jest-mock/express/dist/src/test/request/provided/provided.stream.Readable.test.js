"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const request_1 = __importDefault(require("../../../request/request"));
describe('request - Provided for "stream.Readable" (accepts arguments and returns expected values)', () => {
    test('req.readable can be provided', () => {
        const req = (0, request_1.default)({ readable: provided_1.providedBoolean });
        expect(req.readable).toBeDefined();
        expect(req.readable).toBe(provided_1.providedBoolean);
    });
    test('req.readableHighWaterMark can be provided', () => {
        const req = (0, request_1.default)({ readableHighWaterMark: provided_1.providedNumber });
        expect(req.readableHighWaterMark).toBeDefined();
        expect(req.readableHighWaterMark).toBe(provided_1.providedNumber);
    });
    test('req.readableLength can be provided', () => {
        const req = (0, request_1.default)({ readableLength: provided_1.providedNumber });
        expect(req.readableLength).toBeDefined();
        expect(req.readableLength).toBe(provided_1.providedNumber);
    });
    test('req.readableObjectMode can be provided', () => {
        const req = (0, request_1.default)({ readableObjectMode: provided_1.providedBoolean });
        expect(req.readableObjectMode).toBeDefined();
        expect(req.readableObjectMode).toBe(provided_1.providedBoolean);
    });
    test('req.destroyed can be provided', () => {
        const req = (0, request_1.default)({ destroyed: provided_1.providedBoolean });
        expect(req.destroyed).toBeDefined();
        expect(req.destroyed).toBe(provided_1.providedBoolean);
    });
    test('req.constructor can be provided', () => {
        const req = (0, request_1.default)({ constructor: provided_1.providedFunction });
        expect(req.constructor).toBeDefined();
        expect(req.constructor).toBe(provided_1.providedFunction);
    });
    test('req._read can be provided', () => {
        const req = (0, request_1.default)({ _read: provided_1.providedFunction });
        expect(req._read).toBeDefined();
        expect(req._read).toBe(provided_1.providedFunction);
    });
    test('req.read can be provided', () => {
        const req = (0, request_1.default)({ read: provided_1.providedFunction });
        expect(req.read).toBeDefined();
        expect(req.read).toBe(provided_1.providedFunction);
    });
    test('req.setEncoding can be provided', () => {
        const req = (0, request_1.default)({ setEncoding: provided_1.providedFunction });
        expect(req.setEncoding).toBeDefined();
        expect(req.setEncoding).toBe(provided_1.providedFunction);
    });
    test('req.pause can be provided', () => {
        const req = (0, request_1.default)({ pause: provided_1.providedFunction });
        expect(req.pause).toBeDefined();
        expect(req.pause).toBe(provided_1.providedFunction);
    });
    test('req.resume can be provided', () => {
        const req = (0, request_1.default)({ resume: provided_1.providedFunction });
        expect(req.resume).toBeDefined();
        expect(req.resume).toBe(provided_1.providedFunction);
    });
    test('req.isPaused can be provided', () => {
        const req = (0, request_1.default)({ isPaused: provided_1.providedFunction });
        expect(req.isPaused).toBeDefined();
        expect(req.isPaused).toBe(provided_1.providedFunction);
    });
    test('req.unpipe can be provided', () => {
        const req = (0, request_1.default)({ unpipe: provided_1.providedFunction });
        expect(req.unpipe).toBeDefined();
        expect(req.unpipe).toBe(provided_1.providedFunction);
    });
    test('req.unshift can be provided', () => {
        const req = (0, request_1.default)({ unshift: provided_1.providedFunction });
        expect(req.unshift).toBeDefined();
        expect(req.unshift).toBe(provided_1.providedFunction);
    });
    test('req.wrap can be provided', () => {
        const req = (0, request_1.default)({ wrap: provided_1.providedFunction });
        expect(req.wrap).toBeDefined();
        expect(req.wrap).toBe(provided_1.providedFunction);
    });
    test('req.push can be provided', () => {
        const req = (0, request_1.default)({ push: provided_1.providedFunction });
        expect(req.push).toBeDefined();
        expect(req.push).toBe(provided_1.providedFunction);
    });
    test('req._destroy can be provided', () => {
        const req = (0, request_1.default)({ _destroy: provided_1.providedFunction });
        expect(req._destroy).toBeDefined();
        expect(req._destroy).toBe(provided_1.providedFunction);
    });
    test('req.addListener can be provided', () => {
        const req = (0, request_1.default)({ addListener: provided_1.providedFunction });
        expect(req.addListener).toBeDefined();
        expect(req.addListener).toBe(provided_1.providedFunction);
    });
    test('req.emit can be provided', () => {
        const req = (0, request_1.default)({ emit: provided_1.providedFunction });
        expect(req.emit).toBeDefined();
        expect(req.emit).toBe(provided_1.providedFunction);
    });
    test('req.on can be provided', () => {
        const req = (0, request_1.default)({ on: provided_1.providedFunction });
        expect(req.on).toBeDefined();
        expect(req.on).toBe(provided_1.providedFunction);
    });
    test('req.once can be provided', () => {
        const req = (0, request_1.default)({ once: provided_1.providedFunction });
        expect(req.once).toBeDefined();
        expect(req.once).toBe(provided_1.providedFunction);
    });
    test('req.prependListener can be provided', () => {
        const req = (0, request_1.default)({ prependListener: provided_1.providedFunction });
        expect(req.prependListener).toBeDefined();
        expect(req.prependListener).toBe(provided_1.providedFunction);
    });
    test('req.prependOnceListener can be provided', () => {
        const req = (0, request_1.default)({ prependOnceListener: provided_1.providedFunction });
        expect(req.prependOnceListener).toBeDefined();
        expect(req.prependOnceListener).toBe(provided_1.providedFunction);
    });
    test('req.removeListener can be provided', () => {
        const req = (0, request_1.default)({ removeListener: provided_1.providedFunction });
        expect(req.removeListener).toBeDefined();
        expect(req.removeListener).toBe(provided_1.providedFunction);
    });
    test('req.destroy can be provided', () => {
        const req = (0, request_1.default)({ destroy: provided_1.providedFunction });
        expect(req.destroy).toBeDefined();
        expect(req.destroy).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.stream.Readable.test.js.map