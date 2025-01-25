"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelParameters = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const utils_1 = require("../../utils");
exports.channelParameters = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            parameters: {
                type: 'object',
            },
        },
        required: ['parameters'],
    },
    options: null,
}, (targetVal, _, ctx) => {
    const path = ctx.path[ctx.path.length - 1];
    const results = [];
    const parameters = (0, utils_1.parseUrlVariables)(path);
    if (parameters.length === 0)
        return;
    const missingParameters = (0, utils_1.getMissingProps)(parameters, targetVal.parameters);
    if (missingParameters.length) {
        results.push({
            message: `Not all channel's parameters are described with "parameters" object. Missed: ${missingParameters.join(', ')}.`,
            path: [...ctx.path, 'parameters'],
        });
    }
    const redundantParameters = (0, utils_1.getRedundantProps)(parameters, targetVal.parameters);
    if (redundantParameters.length) {
        redundantParameters.forEach(param => {
            results.push({
                message: `Channel's "parameters" object has redundant defined "${param}" parameter.`,
                path: [...ctx.path, 'parameters', param],
            });
        });
    }
    return results;
});
