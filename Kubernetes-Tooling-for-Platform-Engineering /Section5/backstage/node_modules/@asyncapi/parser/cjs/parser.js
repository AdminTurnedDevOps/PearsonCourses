"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const document_1 = require("./document");
const parse_1 = require("./parse");
const validate_1 = require("./validate");
const schema_parser_1 = require("./schema-parser");
const asyncapi_schema_parser_1 = require("./schema-parser/asyncapi-schema-parser");
const spectral_1 = require("./spectral");
class Parser {
    constructor(options = {}) {
        var _a;
        this.options = options;
        this.parserRegistry = new Map();
        this.spectral = (0, spectral_1.createSpectral)(this, options);
        this.registerSchemaParser((0, asyncapi_schema_parser_1.AsyncAPISchemaParser)());
        (_a = this.options.schemaParsers) === null || _a === void 0 ? void 0 : _a.forEach(parser => this.registerSchemaParser(parser));
    }
    parse(asyncapi, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeDocument = (0, document_1.toAsyncAPIDocument)(asyncapi);
            if (maybeDocument) {
                return {
                    document: maybeDocument,
                    diagnostics: [],
                };
            }
            return (0, parse_1.parse)(this, this.spectral, asyncapi, options);
        });
    }
    validate(asyncapi, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeDocument = (0, document_1.toAsyncAPIDocument)(asyncapi);
            if (maybeDocument) {
                return [];
            }
            return (yield (0, validate_1.validate)(this, this.spectral, asyncapi, options)).diagnostics;
        });
    }
    registerSchemaParser(parser) {
        return (0, schema_parser_1.registerSchemaParser)(this, parser);
    }
}
exports.Parser = Parser;
