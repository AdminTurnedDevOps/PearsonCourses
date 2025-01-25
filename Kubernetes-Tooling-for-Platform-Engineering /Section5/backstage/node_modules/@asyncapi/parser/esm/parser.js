var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toAsyncAPIDocument } from './document';
import { parse } from './parse';
import { validate } from './validate';
import { registerSchemaParser } from './schema-parser';
import { AsyncAPISchemaParser } from './schema-parser/asyncapi-schema-parser';
import { createSpectral } from './spectral';
export class Parser {
    constructor(options = {}) {
        var _a;
        this.options = options;
        this.parserRegistry = new Map();
        this.spectral = createSpectral(this, options);
        this.registerSchemaParser(AsyncAPISchemaParser());
        (_a = this.options.schemaParsers) === null || _a === void 0 ? void 0 : _a.forEach(parser => this.registerSchemaParser(parser));
    }
    parse(asyncapi, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeDocument = toAsyncAPIDocument(asyncapi);
            if (maybeDocument) {
                return {
                    document: maybeDocument,
                    diagnostics: [],
                };
            }
            return parse(this, this.spectral, asyncapi, options);
        });
    }
    validate(asyncapi, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeDocument = toAsyncAPIDocument(asyncapi);
            if (maybeDocument) {
                return [];
            }
            return (yield validate(this, this.spectral, asyncapi, options)).diagnostics;
        });
    }
    registerSchemaParser(parser) {
        return registerSchemaParser(this, parser);
    }
}
