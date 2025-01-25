"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidRule = exports.assertValidRuleset = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@stoplight/json");
const ajv_1 = require("./ajv");
const errors_1 = require("./errors");
const es_aggregate_error_1 = (0, tslib_1.__importDefault)(require("es-aggregate-error"));
function assertValidRuleset(ruleset, format = 'js') {
    var _a;
    if (!(0, json_1.isPlainObject)(ruleset)) {
        throw new errors_1.RulesetValidationError('invalid-ruleset-definition', 'Provided ruleset is not an object', []);
    }
    if (!('rules' in ruleset) && !('extends' in ruleset) && !('overrides' in ruleset)) {
        throw new errors_1.RulesetValidationError('invalid-ruleset-definition', 'Ruleset must have rules or extends or overrides defined', []);
    }
    const validate = (0, ajv_1.createValidator)(format);
    if (!validate(ruleset)) {
        throw new es_aggregate_error_1.default((0, errors_1.convertAjvErrors)((_a = validate.errors) !== null && _a !== void 0 ? _a : []));
    }
}
exports.assertValidRuleset = assertValidRuleset;
function isRuleDefinition(rule) {
    return typeof rule === 'object' && rule !== null && !Array.isArray(rule) && ('given' in rule || 'then' in rule);
}
function assertValidRule(rule, name) {
    if (!isRuleDefinition(rule)) {
        throw new errors_1.RulesetValidationError('invalid-rule-definition', 'Rule definition expected', ['rules', name]);
    }
}
exports.assertValidRule = assertValidRule;
//# sourceMappingURL=assertions.js.map