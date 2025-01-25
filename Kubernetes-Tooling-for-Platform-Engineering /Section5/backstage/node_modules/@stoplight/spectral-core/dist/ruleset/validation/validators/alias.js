"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAlias = void 0;
const json_1 = require("@stoplight/json");
const lodash_1 = require("lodash");
const alias_1 = require("../../alias");
const formats_1 = require("../../formats");
const error_1 = require("./common/error");
const errors_1 = require("../errors");
function getOverrides(overrides, key) {
    if (!Array.isArray(overrides))
        return null;
    const index = Number(key);
    if (Number.isNaN(index))
        return null;
    if (index < 0 && index >= overrides.length)
        return null;
    const actualOverrides = overrides[index];
    return (0, json_1.isPlainObject)(actualOverrides) && (0, json_1.isPlainObject)(actualOverrides.aliases) ? actualOverrides.aliases : null;
}
function validateAlias(ruleset, alias, path) {
    const parsedPath = (0, error_1.toParsedPath)(path);
    try {
        const formats = (0, lodash_1.get)(ruleset, [...parsedPath.slice(0, parsedPath.indexOf('rules') + 2), 'formats']);
        const aliases = parsedPath[0] === 'overrides'
            ? {
                ...ruleset.aliases,
                ...getOverrides(ruleset.overrides, parsedPath[1]),
            }
            : ruleset.aliases;
        (0, alias_1.resolveAlias)(aliases !== null && aliases !== void 0 ? aliases : null, alias, Array.isArray(formats) ? new formats_1.Formats(formats) : null);
    }
    catch (ex) {
        if (ex instanceof ReferenceError) {
            return new errors_1.RulesetValidationError('undefined-alias', ex.message, parsedPath);
        }
        return (0, error_1.wrapError)(ex, path);
    }
}
exports.validateAlias = validateAlias;
//# sourceMappingURL=alias.js.map