"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spectral = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@stoplight/json");
const types_1 = require("@stoplight/types");
const Parsers = (0, tslib_1.__importStar)(require("@stoplight/spectral-parsers"));
const spectral_ref_resolver_1 = require("@stoplight/spectral-ref-resolver");
const document_1 = require("./document");
const documentInventory_1 = require("./documentInventory");
const runner_1 = require("./runner");
const ruleset_1 = require("./ruleset/ruleset");
const generateDocumentWideResult_1 = require("./utils/generateDocumentWideResult");
const ruleset_2 = require("./ruleset");
(0, tslib_1.__exportStar)(require("./types"), exports);
class Spectral {
    constructor(opts) {
        this.opts = opts;
        if ((opts === null || opts === void 0 ? void 0 : opts.resolver) !== void 0) {
            this._resolver = opts.resolver;
        }
        else {
            this._resolver = (0, spectral_ref_resolver_1.createHttpAndFileResolver)();
        }
    }
    parseDocument(target) {
        return target instanceof document_1.Document
            ? target
            : (0, document_1.isParsedResult)(target)
                ? new document_1.ParsedDocument(target)
                : new document_1.Document(typeof target === 'string' ? target : (0, json_1.stringify)(target, void 0, 2), Parsers.Yaml);
    }
    async runWithResolved(target, opts = {}) {
        if (this.ruleset === void 0) {
            throw new Error('No ruleset has been defined. Have you called setRuleset()?');
        }
        const document = this.parseDocument(target);
        const ruleset = this.ruleset.fromSource(document.source);
        const inventory = new documentInventory_1.DocumentInventory(document, this._resolver);
        await inventory.resolve();
        const runner = new runner_1.Runner(inventory);
        runner.results.push(...this._filterParserErrors(document.diagnostics, ruleset.parserOptions));
        if (document.formats === void 0) {
            const foundFormats = [...ruleset.formats].filter(format => format(inventory.resolved, document.source));
            if (foundFormats.length === 0 && opts.ignoreUnknownFormat !== true) {
                document.formats = null;
                if (ruleset.formats.size > 0) {
                    runner.addResult(this._generateUnrecognizedFormatError(document, Array.from(ruleset.formats)));
                }
            }
            else {
                document.formats = new Set(foundFormats);
            }
        }
        await runner.run(ruleset);
        const results = runner.getResults();
        return {
            resolved: inventory.resolved,
            results,
        };
    }
    async run(target, opts = {}) {
        return (await this.runWithResolved(target, opts)).results;
    }
    setRuleset(ruleset) {
        this.ruleset = ruleset instanceof ruleset_1.Ruleset ? ruleset : new ruleset_1.Ruleset(ruleset);
    }
    _generateUnrecognizedFormatError(document, formats) {
        return (0, generateDocumentWideResult_1.generateDocumentWideResult)(document, `The provided document does not match any of the registered formats [${formats
            .map(fn => { var _a; return (_a = fn.displayName) !== null && _a !== void 0 ? _a : fn.name; })
            .join(', ')}]`, types_1.DiagnosticSeverity.Warning, 'unrecognized-format');
    }
    _filterParserErrors(diagnostics, parserOptions) {
        return diagnostics.reduce((diagnostics, diagnostic) => {
            if (diagnostic.code !== 'parser')
                return diagnostics;
            let severity;
            if (diagnostic.message.startsWith('Mapping key must be a string scalar rather than')) {
                severity = (0, ruleset_2.getDiagnosticSeverity)(parserOptions.incompatibleValues);
            }
            else if (diagnostic.message.startsWith('Duplicate key')) {
                severity = (0, ruleset_2.getDiagnosticSeverity)(parserOptions.duplicateKeys);
            }
            else {
                diagnostics.push(diagnostic);
                return diagnostics;
            }
            if (severity !== -1) {
                diagnostics.push(diagnostic);
                diagnostic.severity = severity;
            }
            return diagnostics;
        }, []);
    }
}
exports.Spectral = Spectral;
//# sourceMappingURL=spectral.js.map