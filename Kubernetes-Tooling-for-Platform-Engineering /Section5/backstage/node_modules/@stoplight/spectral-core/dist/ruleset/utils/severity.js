"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnosticSeverity = exports.DEFAULT_SEVERITY_LEVEL = void 0;
const types_1 = require("@stoplight/types");
exports.DEFAULT_SEVERITY_LEVEL = types_1.DiagnosticSeverity.Warning;
const SEVERITY_MAP = {
    error: types_1.DiagnosticSeverity.Error,
    warn: types_1.DiagnosticSeverity.Warning,
    info: types_1.DiagnosticSeverity.Information,
    hint: types_1.DiagnosticSeverity.Hint,
    off: -1,
};
function getDiagnosticSeverity(severity) {
    if (Number.isNaN(Number(severity))) {
        return SEVERITY_MAP[severity];
    }
    return Number(severity);
}
exports.getDiagnosticSeverity = getDiagnosticSeverity;
//# sourceMappingURL=severity.js.map