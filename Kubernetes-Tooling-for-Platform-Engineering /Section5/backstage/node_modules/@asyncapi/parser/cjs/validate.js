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
exports.validate = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_parsers_1 = require("@stoplight/spectral-parsers");
const spectral_1 = require("./spectral");
const utils_1 = require("./utils");
const defaultOptions = {
    allowedSeverity: {
        error: false,
        warning: true,
        info: true,
        hint: true,
    },
    __unstable: {},
};
function validate(parser, parserSpectral, asyncapi, options = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let document;
        try {
            const { allowedSeverity } = (0, utils_1.mergePatch)(defaultOptions, options);
            const stringifiedDocument = (0, utils_1.normalizeInput)(asyncapi);
            document = new spectral_core_1.Document(stringifiedDocument, spectral_parsers_1.Yaml, options.source);
            // add input data (asyncapi argument) to the document to reuse it in rules
            document.__parserInput = asyncapi;
            const spectral = ((_a = options.__unstable) === null || _a === void 0 ? void 0 : _a.resolver) ? (0, spectral_1.createSpectral)(parser, options) : parserSpectral;
            // eslint-disable-next-line prefer-const
            let { resolved: validated, results } = yield spectral.runWithResolved(document, {});
            if ((!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.error) && (0, utils_1.hasErrorDiagnostic)(results)) ||
                (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.warning) && (0, utils_1.hasWarningDiagnostic)(results)) ||
                (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.info) && (0, utils_1.hasInfoDiagnostic)(results)) ||
                (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.hint) && (0, utils_1.hasHintDiagnostic)(results))) {
                validated = undefined;
            }
            return { validated, diagnostics: results, extras: { document: document } };
        }
        catch (err) {
            return { validated: undefined, diagnostics: (0, utils_1.createUncaghtDiagnostic)(err, 'Error thrown during AsyncAPI document validation', document), extras: { document: document } };
        }
    });
}
exports.validate = validate;
