"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAlias = exports.resolveAliasForFormats = void 0;
const guards_1 = require("./utils/guards");
const ALIAS = /^#([A-Za-z0-9_-]+)/;
function resolveAliasForFormats({ targets }, formats) {
    if (formats === null || formats.size === 0) {
        return null;
    }
    for (let i = targets.length - 1; i >= 0; i--) {
        const target = targets[i];
        for (const format of target.formats) {
            if (formats.has(format)) {
                return target.given;
            }
        }
    }
    return null;
}
exports.resolveAliasForFormats = resolveAliasForFormats;
function resolveAlias(aliases, expression, formats) {
    return _resolveAlias(aliases, expression, formats, new Set());
}
exports.resolveAlias = resolveAlias;
function _resolveAlias(aliases, expression, formats, stack) {
    var _a;
    const resolvedExpressions = [];
    if (expression.startsWith('#')) {
        const alias = (_a = ALIAS.exec(expression)) === null || _a === void 0 ? void 0 : _a[1];
        if (alias === void 0 || alias === null) {
            throw new TypeError(`Alias must match /^#([A-Za-z0-9_-]+)/`);
        }
        if (stack.has(alias)) {
            const _stack = [...stack, alias];
            throw new Error(`Alias "${_stack[0]}" is circular. Resolution stack: ${_stack.join(' -> ')}`);
        }
        stack.add(alias);
        if (aliases === null || !(alias in aliases)) {
            throw new ReferenceError(`Alias "${alias}" does not exist`);
        }
        const aliasValue = aliases[alias];
        let actualAliasValue;
        if ((0, guards_1.isSimpleAliasDefinition)(aliasValue)) {
            actualAliasValue = aliasValue;
        }
        else if ((0, guards_1.isScopedAliasDefinition)(aliasValue)) {
            actualAliasValue = resolveAliasForFormats(aliasValue, formats);
        }
        else {
            actualAliasValue = null;
        }
        if (actualAliasValue !== null) {
            resolvedExpressions.push(...actualAliasValue.flatMap(item => _resolveAlias(aliases, item + expression.slice(alias.length + 1), formats, new Set([...stack]))));
        }
    }
    else {
        resolvedExpressions.push(expression);
    }
    return resolvedExpressions;
}
//# sourceMappingURL=alias.js.map