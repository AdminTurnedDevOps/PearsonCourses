var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Document } from '@stoplight/spectral-core';
import { Yaml } from '@stoplight/spectral-parsers';
import { createSpectral } from './spectral';
import { normalizeInput, mergePatch, hasErrorDiagnostic, hasWarningDiagnostic, hasInfoDiagnostic, hasHintDiagnostic, createUncaghtDiagnostic } from './utils';
const defaultOptions = {
    allowedSeverity: {
        error: false,
        warning: true,
        info: true,
        hint: true,
    },
    __unstable: {},
};
export function validate(parser, parserSpectral, asyncapi, options = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let document;
        try {
            const { allowedSeverity } = mergePatch(defaultOptions, options);
            const stringifiedDocument = normalizeInput(asyncapi);
            document = new Document(stringifiedDocument, Yaml, options.source);
            // add input data (asyncapi argument) to the document to reuse it in rules
            document.__parserInput = asyncapi;
            const spectral = ((_a = options.__unstable) === null || _a === void 0 ? void 0 : _a.resolver) ? createSpectral(parser, options) : parserSpectral;
            // eslint-disable-next-line prefer-const
            let { resolved: validated, results } = yield spectral.runWithResolved(document, {});
            if ((!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.error) && hasErrorDiagnostic(results)) ||
                (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.warning) && hasWarningDiagnostic(results)) ||
                (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.info) && hasInfoDiagnostic(results)) ||
                (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.hint) && hasHintDiagnostic(results))) {
                validated = undefined;
            }
            return { validated, diagnostics: results, extras: { document: document } };
        }
        catch (err) {
            return { validated: undefined, diagnostics: createUncaghtDiagnostic(err, 'Error thrown during AsyncAPI document validation', document), extras: { document: document } };
        }
    });
}
