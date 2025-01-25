"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorResult = void 0;
function isErrorResult(t) {
    return 'type' in t && 'message' in t;
}
exports.isErrorResult = isErrorResult;
