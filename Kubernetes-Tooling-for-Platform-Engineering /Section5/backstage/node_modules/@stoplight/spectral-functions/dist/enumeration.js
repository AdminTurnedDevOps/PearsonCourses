"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const optionSchemas_1 = require("./optionSchemas");
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: ['string', 'number', 'null', 'boolean'],
    },
    options: optionSchemas_1.optionSchemas.enumeration,
}, function enumeration(targetVal, { values }) {
    if (!values.includes(targetVal)) {
        return [
            {
                message: `#{{print("value")}} must be equal to one of the allowed values: ${values
                    .map(spectral_runtime_1.printValue)
                    .join(', ')}`,
            },
        ];
    }
    return;
});
//# sourceMappingURL=enumeration.js.map