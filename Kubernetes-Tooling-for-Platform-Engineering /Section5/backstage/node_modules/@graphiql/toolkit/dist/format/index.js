"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResult = exports.formatError = void 0;
function stringify(obj) {
    return JSON.stringify(obj, null, 2);
}
function formatSingleError(error) {
    return __assign(__assign({}, error), { message: error.message, stack: error.stack });
}
function handleSingleError(error) {
    if (error instanceof Error) {
        return formatSingleError(error);
    }
    return error;
}
function formatError(error) {
    if (Array.isArray(error)) {
        return stringify({
            errors: error.map(function (e) { return handleSingleError(e); }),
        });
    }
    return stringify({ errors: [handleSingleError(error)] });
}
exports.formatError = formatError;
function formatResult(result) {
    return stringify(result);
}
exports.formatResult = formatResult;
//# sourceMappingURL=index.js.map