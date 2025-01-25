"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1MicroTime = void 0;
class V1MicroTime extends Date {
    toISOString() {
        return super.toISOString().slice(0, -1) + '000Z';
    }
}
exports.V1MicroTime = V1MicroTime;
//# sourceMappingURL=types.js.map