"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tested Module
const request_1 = __importDefault(require("../../request/request"));
const DEFAULT_REQ_KEY_LENGTH = 80;
describe('request - General', () => {
    test('it returns expected object', () => {
        const req = (0, request_1.default)();
        expect(req).toBeDefined();
        expect(req).toBeInstanceOf(Object);
        expect(Object.keys(req).length).toBe(DEFAULT_REQ_KEY_LENGTH);
    });
});
//# sourceMappingURL=request.test.js.map