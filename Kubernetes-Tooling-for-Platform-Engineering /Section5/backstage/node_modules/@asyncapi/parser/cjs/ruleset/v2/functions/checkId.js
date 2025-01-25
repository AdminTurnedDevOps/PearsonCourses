"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkId = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_functions_1 = require("@stoplight/spectral-functions");
const utils_1 = require("../../utils");
exports.checkId = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            traits: {
                type: 'array',
                items: {
                    type: 'object',
                },
            },
        },
    },
    options: {
        type: 'object',
        properties: {
            idField: {
                type: 'string',
                enum: ['operationId', 'messageId'],
            },
        },
    },
}, (targetVal, options, ctx) => {
    const mergedValue = (0, utils_1.mergeTraits)(targetVal);
    return (0, spectral_functions_1.truthy)(mergedValue[options.idField], null, ctx);
});
