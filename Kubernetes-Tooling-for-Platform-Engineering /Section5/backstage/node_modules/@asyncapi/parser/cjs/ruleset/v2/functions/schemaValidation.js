"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_functions_1 = require("@stoplight/spectral-functions");
function getRelevantItems(target, type) {
    if (type === 'default') {
        return [{ path: ['default'], value: target.default }];
    }
    if (!Array.isArray(target.examples)) {
        return [];
    }
    return Array.from(target.examples.entries()).map(([key, value]) => ({
        path: ['examples', key],
        value,
    }));
}
exports.schemaValidation = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            default: {},
            examples: {
                type: 'array',
            },
        },
        errorMessage: '#{{print("property")}must be an object containing "default" or an "examples" array',
    },
    errorOnInvalidInput: true,
    options: {
        type: 'object',
        properties: {
            type: {
                enum: ['default', 'examples'],
            },
        },
        additionalProperties: false,
        required: ['type'],
    },
}, (targetVal, opts, context) => {
    const schemaObject = targetVal;
    const results = [];
    for (const relevantItem of getRelevantItems(targetVal, opts.type)) {
        const result = (0, spectral_functions_1.schema)(relevantItem.value, {
            schema: schemaObject,
            allErrors: true,
        }, Object.assign(Object.assign({}, context), { path: [...context.path, ...relevantItem.path] }));
        if (Array.isArray(result)) {
            results.push(...result);
        }
    }
    return results;
});
