"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lintNode = void 0;
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const lodash_1 = require("lodash");
const pony_cause_1 = require("pony-cause");
const document_1 = require("../document");
const utils_1 = require("./utils");
const lintNode = (context, node, rule) => {
    var _a;
    const givenPath = node.path.length > 0 && node.path[0] === '$' ? node.path.slice(1) : node.path.slice();
    const fnContext = {
        document: context.documentInventory.document,
        documentInventory: context.documentInventory,
        rule,
        path: givenPath,
    };
    for (const then of rule.then) {
        const targets = (0, utils_1.getLintTargets)(node.value, then.field);
        for (const target of targets) {
            if (target.path.length > 0) {
                fnContext.path = [...givenPath, ...target.path];
            }
            else {
                fnContext.path = givenPath;
            }
            let targetResults;
            try {
                targetResults = then.function(target.value, (_a = then.functionOptions) !== null && _a !== void 0 ? _a : null, fnContext);
            }
            catch (e) {
                throw new pony_cause_1.ErrorWithCause(`Function "${then.function.name}" threw an exception${(0, lodash_1.isError)(e) ? `: ${e.message}` : ''}`, {
                    cause: e,
                });
            }
            if (targetResults === void 0)
                continue;
            if ('then' in targetResults) {
                const _fnContext = { ...fnContext };
                context.promises.push(targetResults.then(results => results === void 0 ? void 0 : processTargetResults(context, _fnContext, results)));
            }
            else {
                processTargetResults(context, fnContext, targetResults);
            }
        }
    }
};
exports.lintNode = lintNode;
function processTargetResults(context, fnContext, results) {
    var _a, _b, _c, _d, _e;
    const { rule, path: targetPath } = fnContext;
    for (const result of results) {
        const escapedJsonPath = ((_a = result.path) !== null && _a !== void 0 ? _a : targetPath).map(spectral_runtime_1.decodeSegmentFragment);
        const associatedItem = context.documentInventory.findAssociatedItemForPath(escapedJsonPath, rule.resolved);
        const path = (_b = associatedItem === null || associatedItem === void 0 ? void 0 : associatedItem.path) !== null && _b !== void 0 ? _b : (0, spectral_runtime_1.getClosestJsonPath)(context.documentInventory.resolved, escapedJsonPath);
        const source = associatedItem === null || associatedItem === void 0 ? void 0 : associatedItem.document.source;
        const document = (_c = associatedItem === null || associatedItem === void 0 ? void 0 : associatedItem.document) !== null && _c !== void 0 ? _c : context.documentInventory.document;
        const range = (_d = document.getRangeForJsonPath(path, true)) !== null && _d !== void 0 ? _d : document_1.Document.DEFAULT_RANGE;
        const value = path.length === 0 ? document.data : (0, lodash_1.get)(document.data, path);
        const vars = {
            property: (associatedItem === null || associatedItem === void 0 ? void 0 : associatedItem.missingPropertyPath) !== void 0 && associatedItem.missingPropertyPath.length > path.length
                ? (0, spectral_runtime_1.printPath)(associatedItem.missingPropertyPath.slice(path.length - 1), spectral_runtime_1.PrintStyle.Dot)
                : path.length > 0
                    ? path[path.length - 1]
                    : '',
            error: result.message,
            path: (0, spectral_runtime_1.printPath)(path, spectral_runtime_1.PrintStyle.EscapedPointer),
            description: rule.description,
            value,
        };
        const resultMessage = (0, utils_1.message)(result.message, vars);
        vars.error = resultMessage;
        const severity = source !== null && source !== void 0 ? rule.getSeverityForSource(source, path) : rule.severity;
        if (severity === -1)
            continue;
        context.results.push({
            code: rule.name,
            message: (rule.message === null ? (_e = rule.description) !== null && _e !== void 0 ? _e : resultMessage : (0, utils_1.message)(rule.message, vars)).trim(),
            path,
            severity,
            ...(source !== null ? { source } : null),
            range,
        });
    }
}
//# sourceMappingURL=lintNode.js.map