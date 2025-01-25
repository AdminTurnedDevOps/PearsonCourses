"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tested Module
const response_1 = __importDefault(require("../../../response/response"));
describe('response - Provided (accepts arguments and returns expected values)', () => {
    test('allows custom properties', () => {
        const mockUser = {
            id: '123',
            name: 'Bob',
        };
        // default value is not provided, but is typed
        const { res: defaultRes } = (0, response_1.default)();
        expect(defaultRes.user).toBeUndefined();
        // allows setting a custom property
        const { res } = (0, response_1.default)({ sendDate: true, user: mockUser });
        // both properties are available
        expect(res.sendDate).toBe(true);
        expect(res.user).toBe(mockUser);
    });
    test('allows locals to be typed', () => {
        const { res } = (0, response_1.default)({
            locals: {
                sessionId: 'abcdef',
                isPremiumUser: false,
            },
        });
        expect(res.locals).toBeDefined();
        expect(res.locals.sessionId).toBe('abcdef');
        expect(res.locals.isPremiumUser).toBe(false);
    });
});
//# sourceMappingURL=provided.test.js.map