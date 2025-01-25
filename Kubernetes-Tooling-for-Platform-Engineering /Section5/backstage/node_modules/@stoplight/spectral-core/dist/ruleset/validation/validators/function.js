"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFunction = void 0;
const error_1 = require("./common/error");
const errors_1 = require("../errors");
function assertRulesetFunction(maybeRulesetFunction) {
    if (typeof maybeRulesetFunction !== 'function') {
        throw ReferenceError('Function is not defined');
    }
}
function validateFunction(fn, opts, path) {
    try {
        assertRulesetFunction(fn);
        if (!('validator' in fn))
            return;
        const validator = fn.validator.bind(fn);
        validator(opts);
    }
    catch (ex) {
        if (ex instanceof ReferenceError) {
            return new errors_1.RulesetValidationError('undefined-function', ex.message, [...(0, error_1.toParsedPath)(path), 'function']);
        }
        return (0, error_1.wrapError)(ex, path);
    }
}
exports.validateFunction = validateFunction;
//# sourceMappingURL=function.js.map