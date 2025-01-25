"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAggregateError = void 0;
const lodash_1 = require("lodash");
function isAggregateError(maybeAggregateError) {
    return (0, lodash_1.isError)(maybeAggregateError) && maybeAggregateError.constructor.name === 'AggregateError';
}
exports.isAggregateError = isAggregateError;
//# sourceMappingURL=isAggregateError.js.map