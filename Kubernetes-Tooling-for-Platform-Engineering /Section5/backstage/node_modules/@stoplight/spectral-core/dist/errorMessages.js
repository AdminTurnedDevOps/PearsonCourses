"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResolverErrors = exports.formatParserDiagnostics = exports.prettyPrintResolverErrorMessage = exports.getDiagnosticErrorMessage = void 0;
const types_1 = require("@stoplight/types");
const lodash_1 = require("lodash");
const document_1 = require("./document");
const toUpperCase = (word) => word.toUpperCase();
const splitWord = (word, end, start) => `${end} ${start.toLowerCase()}`;
function getDiagnosticErrorMessage(diagnostic) {
    const key = getPropertyKey(diagnostic.path);
    let prettifiedMessage = diagnostic.message.replace(/^[a-z]/, toUpperCase);
    if (diagnostic.code !== 'YAMLException') {
        prettifiedMessage = prettifiedMessage.replace(/([a-z])([A-Z])/g, splitWord);
    }
    if (key !== undefined) {
        prettifiedMessage = prettifiedMessage.replace(/(Duplicate key)/, `$1: ${key}`);
    }
    return prettifiedMessage;
}
exports.getDiagnosticErrorMessage = getDiagnosticErrorMessage;
const prettyPrintResolverErrorMessage = (message) => message.replace(/^Error\s*:\s*/, '');
exports.prettyPrintResolverErrorMessage = prettyPrintResolverErrorMessage;
const getPropertyKey = (path) => {
    if (path !== undefined && path.length > 0) {
        return path[path.length - 1];
    }
};
function formatParserDiagnostics(diagnostics, source) {
    return diagnostics.map(diagnostic => {
        var _a;
        return ({
            ...diagnostic,
            code: 'parser',
            message: getDiagnosticErrorMessage(diagnostic),
            path: (_a = diagnostic.path) !== null && _a !== void 0 ? _a : [],
            ...(source !== null ? { source } : null),
        });
    });
}
exports.formatParserDiagnostics = formatParserDiagnostics;
const formatResolverErrors = (document, diagnostics) => {
    return (0, lodash_1.uniqBy)(diagnostics, 'message').map(error => {
        var _a;
        const path = [...error.path, '$ref'];
        const range = (_a = document.getRangeForJsonPath(path, true)) !== null && _a !== void 0 ? _a : document_1.Document.DEFAULT_RANGE;
        const source = error.uriStack.length > 0 ? error.uriStack[error.uriStack.length - 1] : document.source;
        return {
            code: 'invalid-ref',
            path,
            message: (0, exports.prettyPrintResolverErrorMessage)(error.message),
            severity: types_1.DiagnosticSeverity.Error,
            range,
            ...(source !== null ? { source } : null),
        };
    });
};
exports.formatResolverErrors = formatResolverErrors;
//# sourceMappingURL=errorMessages.js.map