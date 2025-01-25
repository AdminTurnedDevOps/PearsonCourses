"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const provided_1 = require("../../helpers/provided");
// Tested Module
const response_1 = __importDefault(require("../../../response/response"));
describe('response - Provided for "event.EventEmitter" (accepts arguments and returns expected values)', () => {
    test('res.addListener can be provided', () => {
        const { res } = (0, response_1.default)({ addListener: provided_1.providedFunction });
        expect(res.addListener).toBeDefined();
        expect(res.addListener).toBe(provided_1.providedFunction);
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
    test('res.removeListener can be provided', () => {
        const { res } = (0, response_1.default)({ removeListener: provided_1.providedFunction });
        expect(res.removeListener).toBeDefined();
        expect(res.removeListener).toBe(provided_1.providedFunction);
    });
    test('res.off can be provided', () => {
        const { res } = (0, response_1.default)({ off: provided_1.providedFunction });
        expect(res.off).toBeDefined();
        expect(res.off).toBe(provided_1.providedFunction);
    });
    test('res.removeAllListeners can be provided', () => {
        const { res } = (0, response_1.default)({ removeAllListeners: provided_1.providedFunction });
        expect(res.removeAllListeners).toBeDefined();
        expect(res.removeAllListeners).toBe(provided_1.providedFunction);
    });
    test('res.setMaxListeners can be provided', () => {
        const { res } = (0, response_1.default)({ setMaxListeners: provided_1.providedFunction });
        expect(res.setMaxListeners).toBeDefined();
        expect(res.setMaxListeners).toBe(provided_1.providedFunction);
    });
    test('res.getMaxListeners can be provided', () => {
        const { res } = (0, response_1.default)({ getMaxListeners: provided_1.providedFunction });
        expect(res.getMaxListeners).toBeDefined();
        expect(res.getMaxListeners).toBe(provided_1.providedFunction);
    });
    test('res.listeners can be provided', () => {
        const { res } = (0, response_1.default)({ listeners: provided_1.providedFunction });
        expect(res.listeners).toBeDefined();
        expect(res.listeners).toBe(provided_1.providedFunction);
    });
    test('res.rawListeners can be provided', () => {
        const { res } = (0, response_1.default)({ rawListeners: provided_1.providedFunction });
        expect(res.rawListeners).toBeDefined();
        expect(res.rawListeners).toBe(provided_1.providedFunction);
    });
    test('res.emit can be provided', () => {
        const { res } = (0, response_1.default)({ emit: provided_1.providedFunction });
        expect(res.emit).toBeDefined();
        expect(res.emit).toBe(provided_1.providedFunction);
    });
    test('res.listenerCount can be provided', () => {
        const { res } = (0, response_1.default)({ listenerCount: provided_1.providedFunction });
        expect(res.listenerCount).toBeDefined();
        expect(res.listenerCount).toBe(provided_1.providedFunction);
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
    test('res.eventNames can be provided', () => {
        const { res } = (0, response_1.default)({ eventNames: provided_1.providedFunction });
        expect(res.eventNames).toBeDefined();
        expect(res.eventNames).toBe(provided_1.providedFunction);
    });
});
//# sourceMappingURL=provided.event.EventEmitter.test.js.map