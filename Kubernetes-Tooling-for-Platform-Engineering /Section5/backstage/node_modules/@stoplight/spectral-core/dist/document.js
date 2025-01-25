"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParsedResult = exports.ParsedDocument = exports.Document = exports.normalizeSource = void 0;
const path_1 = require("@stoplight/path");
const errorMessages_1 = require("./errorMessages");
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const json_1 = require("@stoplight/json");
function normalizeSource(source) {
    if (source === void 0)
        return null;
    return source.length > 0 && !(0, spectral_runtime_1.startsWithProtocol)(source) ? (0, path_1.normalize)(source) : source;
}
exports.normalizeSource = normalizeSource;
class Document {
    constructor(input, parser, source) {
        this.input = input;
        this.parser = parser;
        this.parserResult = parser.parse(input);
        this.source = normalizeSource(source);
        this.diagnostics = (0, errorMessages_1.formatParserDiagnostics)(this.parserResult.diagnostics, this.source);
    }
    getRangeForJsonPath(path, closest) {
        var _a;
        return (_a = this.parser.getLocationForJsonPath(this.parserResult, path, closest)) === null || _a === void 0 ? void 0 : _a.range;
    }
    trapAccess(obj) {
        return this.parser.trapAccess(obj);
    }
    static get DEFAULT_RANGE() {
        return {
            start: {
                character: 0,
                line: 0,
            },
            end: {
                character: 0,
                line: 0,
            },
        };
    }
    get data() {
        return this.parserResult.data;
    }
}
exports.Document = Document;
class ParsedDocument {
    constructor(parserResult) {
        this.parserResult = parserResult;
        this.source = normalizeSource(parserResult.source);
        this.diagnostics = (0, errorMessages_1.formatParserDiagnostics)(this.parserResult.parsed.diagnostics, this.source);
    }
    trapAccess(obj) {
        return obj;
    }
    getRangeForJsonPath(path, closest) {
        var _a;
        return (_a = this.parserResult.getLocationForJsonPath(this.parserResult.parsed, path, closest)) === null || _a === void 0 ? void 0 : _a.range;
    }
    get data() {
        return this.parserResult.parsed.data;
    }
}
exports.ParsedDocument = ParsedDocument;
const isParsedResult = (obj) => (0, json_1.isPlainObject)(obj) && (0, json_1.isPlainObject)(obj.parsed) && typeof obj.getLocationForJsonPath === 'function';
exports.isParsedResult = isParsedResult;
//# sourceMappingURL=document.js.map