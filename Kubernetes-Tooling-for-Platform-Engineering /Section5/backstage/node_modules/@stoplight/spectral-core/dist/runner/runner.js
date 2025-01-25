"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const tslib_1 = require("tslib");
const results_1 = require("./utils/results");
const lintNode_1 = require("./lintNode");
const legacy_1 = (0, tslib_1.__importDefault)(require("nimma/legacy"));
const fallbacks_1 = require("nimma/fallbacks");
const json_1 = require("@stoplight/json");
class Runner {
    constructor(inventory) {
        var _a;
        this.inventory = inventory;
        this.results = [...this.inventory.diagnostics, ...((_a = this.inventory.errors) !== null && _a !== void 0 ? _a : [])];
    }
    get document() {
        return this.inventory.document;
    }
    addResult(result) {
        this.results.push(result);
    }
    async run(ruleset) {
        var _a, _b;
        var _c;
        const { inventory: documentInventory } = this;
        const { rules } = ruleset;
        const formats = (_a = this.document.formats) !== null && _a !== void 0 ? _a : null;
        const runnerContext = {
            ruleset,
            documentInventory,
            results: this.results,
            promises: [],
        };
        const enabledRules = Object.values(rules).filter(rule => rule.enabled);
        const relevantRules = enabledRules.filter(rule => rule.matchesFormat(documentInventory.formats));
        const callbacks = {
            resolved: {},
            unresolved: {},
        };
        for (const rule of relevantRules) {
            for (const given of rule.getGivenForFormats(formats)) {
                const cb = (scope) => {
                    (0, lintNode_1.lintNode)(runnerContext, scope, rule);
                };
                ((_b = (_c = callbacks[rule.resolved ? 'resolved' : 'unresolved'])[given]) !== null && _b !== void 0 ? _b : (_c[given] = [])).push(cb);
            }
        }
        const resolvedJsonPaths = Object.keys(callbacks.resolved);
        const unresolvedJsonPaths = Object.keys(callbacks.unresolved);
        if (resolvedJsonPaths.length > 0) {
            execute(runnerContext.documentInventory.resolved, callbacks.resolved, resolvedJsonPaths);
        }
        if (unresolvedJsonPaths.length > 0) {
            execute(runnerContext.documentInventory.unresolved, callbacks.unresolved, unresolvedJsonPaths);
        }
        if (runnerContext.promises.length > 0) {
            await Promise.all(runnerContext.promises);
        }
    }
    getResults() {
        return (0, results_1.prepareResults)(this.results);
    }
}
exports.Runner = Runner;
function execute(input, callbacks, jsonPathExpressions) {
    var _a;
    if (!(0, json_1.isPlainObject)(input) && !Array.isArray(input)) {
        for (const cb of (_a = callbacks.$) !== null && _a !== void 0 ? _a : []) {
            cb({
                path: [],
                value: input,
            });
        }
        return;
    }
    const nimma = new legacy_1.default(jsonPathExpressions, {
        fallback: fallbacks_1.jsonPathPlus,
        unsafe: false,
        output: 'auto',
        customShorthands: {},
    });
    nimma.query(input, Object.entries(callbacks).reduce((mapped, [key, cbs]) => {
        mapped[key] = scope => {
            for (const cb of cbs) {
                cb(scope);
            }
        };
        return mapped;
    }, {}));
}
//# sourceMappingURL=runner.js.map