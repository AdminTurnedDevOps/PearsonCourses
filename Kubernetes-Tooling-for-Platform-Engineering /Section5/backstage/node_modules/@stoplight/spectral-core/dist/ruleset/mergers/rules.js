"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRule = void 0;
const assertions_1 = require("../validation/assertions");
const rule_1 = require("../rule");
function assertExistingRule(maybeRule, name) {
    if (maybeRule === void 0) {
        throw new ReferenceError(`Cannot extend non-existing rule: "${name}"`);
    }
}
function mergeRule(existingRule, name, rule, ruleset) {
    switch (typeof rule) {
        case 'boolean':
            assertExistingRule(existingRule, name);
            existingRule.enabled = rule;
            break;
        case 'string':
        case 'number':
            assertExistingRule(existingRule, name);
            existingRule.severity = rule;
            if (rule === 'off') {
                existingRule.enabled = false;
            }
            else if (!existingRule.enabled) {
                existingRule.enabled = true;
            }
            break;
        case 'object':
            if (existingRule !== void 0) {
                Object.assign(existingRule, rule, {
                    enabled: true,
                    owner: existingRule.owner,
                });
            }
            else {
                (0, assertions_1.assertValidRule)(rule, name);
                return new rule_1.Rule(name, rule, ruleset);
            }
            break;
        default:
            throw new Error('Invalid value');
    }
    return existingRule;
}
exports.mergeRule = mergeRule;
//# sourceMappingURL=rules.js.map