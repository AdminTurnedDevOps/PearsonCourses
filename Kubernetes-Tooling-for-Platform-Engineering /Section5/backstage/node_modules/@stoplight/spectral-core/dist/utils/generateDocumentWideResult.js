"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocumentWideResult = void 0;
const document_1 = require("../document");
const generateDocumentWideResult = (document, message, severity, code) => {
    var _a;
    return {
        range: (_a = document.getRangeForJsonPath([], true)) !== null && _a !== void 0 ? _a : document_1.Document.DEFAULT_RANGE,
        message,
        code,
        severity,
        ...(document.source !== null ? { source: document.source } : null),
        path: [],
    };
};
exports.generateDocumentWideResult = generateDocumentWideResult;
//# sourceMappingURL=generateDocumentWideResult.js.map