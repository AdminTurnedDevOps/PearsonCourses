"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tested Module
const request_1 = __importDefault(require("../../../request/request"));
describe('request - Provided (accepts arguments and returns expected values)', () => {
    test('it allows custom properties', () => {
        const mockUser = {
            id: '123',
            name: 'Bob',
        };
        const req = (0, request_1.default)({
            user: mockUser,
            query: {
                id: '123',
                limit: '10',
                page: '2',
            },
        });
        // req.user has the provided arguments
        expect(req.user).toBeDefined();
        expect(req.user).toBe(mockUser);
        // req.query has the provided arguments
        expect(req.query).toBeDefined();
        expect(req.query).toBeInstanceOf(Object);
        expect(Object.keys(req.query).length).toBe(3);
        expect(req.query['id']).toBe('123');
        expect(req.query['limit']).toBe('10');
        expect(req.query['page']).toBe('2');
    });
});
//# sourceMappingURL=provided.test.js.map