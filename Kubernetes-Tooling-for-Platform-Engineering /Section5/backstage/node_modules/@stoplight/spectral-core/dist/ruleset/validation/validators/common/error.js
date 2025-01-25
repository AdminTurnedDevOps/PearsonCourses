"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toParsedPath = exports.wrapError = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const es_aggregate_error_1 = (0, tslib_1.__importDefault)(require("es-aggregate-error"));
const errors_1 = require("../../errors");
const isAggregateError_1 = require("../../../../guards/isAggregateError");
function toRulesetValidationError(ex) {
    if (ex instanceof errors_1.RulesetValidationError) {
        ex.path.unshift(...this);
        return ex;
    }
    return new errors_1.RulesetValidationError('generic-validation-error', (0, lodash_1.isError)(ex) ? ex.message : String(ex), [...this]);
}
function wrapError(ex, path) {
    const parsedPath = toParsedPath(path);
    if ((0, isAggregateError_1.isAggregateError)(ex)) {
        return new es_aggregate_error_1.default(ex.errors.map(toRulesetValidationError, parsedPath));
    }
    return toRulesetValidationError.call(parsedPath, ex);
}
exports.wrapError = wrapError;
function toParsedPath(path) {
    return path.slice(1).split('/');
}
exports.toParsedPath = toParsedPath;
//# sourceMappingURL=error.js.map