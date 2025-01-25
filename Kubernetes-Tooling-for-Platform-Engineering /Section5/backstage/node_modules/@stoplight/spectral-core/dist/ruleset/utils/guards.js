"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScopedAliasDefinition = exports.isValidAliasTarget = exports.isSimpleAliasDefinition = void 0;
const json_1 = require("@stoplight/json");
const lodash_1 = require("lodash");
function isSimpleAliasDefinition(alias) {
    return Array.isArray(alias);
}
exports.isSimpleAliasDefinition = isSimpleAliasDefinition;
function isValidAliasTarget(target) {
    const formats = target.formats;
    if (!Array.isArray(formats) && !(formats instanceof Set)) {
        return false;
    }
    return Array.isArray(target.given) && target.given.every(lodash_1.isString);
}
exports.isValidAliasTarget = isValidAliasTarget;
function isScopedAliasDefinition(alias) {
    return (0, json_1.isPlainObject)(alias) && Array.isArray(alias.targets) && alias.targets.every(isValidAliasTarget);
}
exports.isScopedAliasDefinition = isScopedAliasDefinition;
//# sourceMappingURL=guards.js.map