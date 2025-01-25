"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tested Module
const request_1 = __importDefault(require("../../request/request"));
describe('request - GitHub Issues', () => {
    test('issue #6', () => {
        let AppOS;
        (function (AppOS) {
            AppOS["Android"] = "1";
        })(AppOS || (AppOS = {}));
        const req = (0, request_1.default)({
            query: {
                os: AppOS.Android,
                sellerId: '12345',
            },
            headers: {
                Authorization: 'valid-token',
            },
        });
        // req.query has the provided arguments
        expect(req.query).toBeDefined();
        expect(req.query).toBeInstanceOf(Object);
        expect(Object.keys(req.query).length).toBe(2);
        expect(req.query['os']).toBe(AppOS.Android);
        expect(req.query['sellerId']).toBe('12345');
        // req.headers has the provided arguments
        expect(req.headers).toBeDefined();
        expect(req.headers).toBeInstanceOf(Object);
        expect(Object.keys(req.headers).length).toBe(1);
        expect(req.headers['Authorization']).toBe('valid-token');
    });
    test('issue #27', () => {
        const req = (0, request_1.default)({
            locals: { var: 'hi there' },
            customProperty: 'value',
        });
        // req.locals has the provided arguments
        expect(req.locals).toBeDefined();
        expect(req.locals).toEqual({ var: 'hi there' });
        // req.customProperty has the provided arguments
        expect(req.customProperty).toBeDefined();
        expect(req.customProperty).toEqual('value');
    });
});
//# sourceMappingURL=github.test.js.map