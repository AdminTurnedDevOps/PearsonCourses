"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonPrimitive = void 0;
function isJsonPrimitive(maybeJsonPrimitive) {
    return (maybeJsonPrimitive === null ||
        typeof maybeJsonPrimitive === 'number' ||
        typeof maybeJsonPrimitive === 'string' ||
        typeof maybeJsonPrimitive === 'boolean');
}
exports.isJsonPrimitive = isJsonPrimitive;
//# sourceMappingURL=isJsonPrimitive.js.map