"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const request_1 = __importDefault(require("../../../request/request"));
describe('request - Provided for "event.EventEmitter" (accepts arguments and returns expected values)', () => {
    test('req.addListener can be provided', () => {
        const req = (0, request_1.default)({ addListener: provided_1.providedFunction });
        expect(req.addListener).toBeDefined();
        expect(req.addListener).toBe(provided_1.providedFunction);
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
    test('req.removeListener can be provided', () => {
        const req = (0, request_1.default)({ removeListener: provided_1.providedFunction });
        expect(req.removeListener).toBeDefined();
        expect(req.removeListener).toBe(provided_1.providedFunction);
    });
    test('req.off can be provided', () => {
        const req = (0, request_1.default)({ off: provided_1.providedFunction });
        expect(req.off).toBeDefined();
        expect(req.off).toBe(provided_1.providedFunction);
    });
    test('req.removeAllListeners can be provided', () => {
        const req = (0, request_1.default)({ removeAllListeners: provided_1.providedFunction });
        expect(req.removeAllListeners).toBeDefined();
        expect(req.removeAllListeners).toBe(provided_1.providedFunction);
    });
    test('req.setMaxListeners can be provided', () => {
        const req = (0, request_1.default)({ setMaxListeners: provided_1.providedFunction });
        expect(req.setMaxListeners).toBeDefined();
        expect(req.setMaxListeners).toBe(provided_1.providedFunction);
    });
    test('req.getMaxListeners can be provided', () => {
        const req = (0, request_1.default)({ getMaxListeners: provided_1.providedFunction });
        expect(req.getMaxListeners).toBeDefined();
        expect(req.getMaxListeners).toBe(provided_1.providedFunction);
    });
    test('req.listeners can be provided', () => {
        const req = (0, request_1.default)({ listeners: provided_1.providedFunction });
        expect(req.listeners).toBeDefined();
        expect(req.listeners).toBe(provided_1.providedFunction);
    });
    test('req.rawListeners can be provided', () => {
        const req = (0, request_1.default)({ rawListeners: provided_1.providedFunction });
        expect(req.rawListeners).toBeDefined();
        expect(req.rawListeners).toBe(provided_1.providedFunction);
    });
    test('req.emit can be provided', () => {
        const req = (0, request_1.default)({ emit: provided_1.providedFunction });
        expect(req.emit).toBeDefined();
        expect(req.emit).toBe(provided_1.providedFunction);
    });
    test('req.listenerCount can be provided', () => {
        const req = (0, request_1.default)({ listenerCount: provided_1.providedFunction });
        expect(req.listenerCount).toBeDefined();
        expect(req.listenerCount).toBe(provided_1.providedFunction);
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
    test('req.eventNames can be provided', () => {
        const req = (0, request_1.default)({ eventNames: provided_1.providedFunction });
        expect(req.eventNames).toBeDefined();
        expect(req.eventNames).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.event.EventEmitter.test.js.map