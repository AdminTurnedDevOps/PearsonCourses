"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spectral_core_1 = require("@stoplight/spectral-core");
const optionSchemas_1 = require("./optionSchemas");
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: null,
    options: optionSchemas_1.optionSchemas.undefined,
}, function undefined(targetVal) {
    if (typeof targetVal !== 'undefined') {
        return [
            {
                message: '#{{print("property")}}must be undefined',
            },
        ];
    }
    return;
});
//# sourceMappingURL=undefined.js.map