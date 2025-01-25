"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unusedComponent = void 0;
const spectral_functions_1 = require("@stoplight/spectral-functions");
const spectral_core_1 = require("@stoplight/spectral-core");
const utils_1 = require("../../utils");
exports.unusedComponent = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            components: {
                type: 'object',
            },
        },
        required: ['components'],
    },
    options: null,
}, (targetVal, _, context) => {
    const components = targetVal.components;
    const results = [];
    Object.keys(components).forEach(componentType => {
        // if component type is `securitySchemes` we skip the validation
        // security schemes in >=2.x.x are referenced by keys, not by object ref - for this case we have a separate `asyncapi2-unused-securityScheme` rule
        if (componentType === 'securitySchemes') {
            return;
        }
        const value = components[componentType];
        if (!(0, utils_1.isObject)(value)) {
            return;
        }
        const resultsForType = (0, spectral_functions_1.unreferencedReusableObject)(value, { reusableObjectsLocation: `#/components/${componentType}` }, context);
        if (resultsForType && Array.isArray(resultsForType)) {
            results.push(...resultsForType);
        }
    });
    return results;
});
