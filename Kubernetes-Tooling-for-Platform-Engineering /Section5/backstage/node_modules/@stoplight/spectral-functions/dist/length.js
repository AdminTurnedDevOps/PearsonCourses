"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const json_1 = require("@stoplight/json");
const optionSchemas_1 = require("./optionSchemas");
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: ['array', 'object', 'string', 'number'],
    },
    options: optionSchemas_1.optionSchemas.length,
}, function length(targetVal, opts) {
    let value;
    if ((0, json_1.isPlainObject)(targetVal)) {
        value = Object.keys(targetVal).length;
    }
    else if (Array.isArray(targetVal)) {
        value = targetVal.length;
    }
    else if (typeof targetVal === 'number') {
        value = targetVal;
    }
    else {
        value = targetVal.length;
    }
    let results;
    if ('min' in opts && value < opts.min) {
        results = [
            {
                message: `#{{print("property")}}must be longer than ${(0, spectral_runtime_1.printValue)(opts.min)}`,
            },
        ];
    }
    if ('max' in opts && value > opts.max) {
        (results !== null && results !== void 0 ? results : (results = [])).push({
            message: `#{{print("property")}}must be shorter than ${(0, spectral_runtime_1.printValue)(opts.max)}`,
        });
    }
    return results;
});
//# sourceMappingURL=length.js.map