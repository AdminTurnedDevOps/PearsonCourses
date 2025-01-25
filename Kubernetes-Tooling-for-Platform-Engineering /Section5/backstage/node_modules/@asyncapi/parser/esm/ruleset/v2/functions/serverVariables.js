import { createRulesetFunction } from '@stoplight/spectral-core';
import { getMissingProps, getRedundantProps, parseUrlVariables } from '../../utils';
export const serverVariables = createRulesetFunction({
    input: {
        type: 'object',
        properties: {
            url: {
                type: 'string',
            },
            variables: {
                type: 'object',
            },
        },
        required: ['url', 'variables'],
    },
    options: null,
}, (targetVal, _, ctx) => {
    const results = [];
    const variables = parseUrlVariables(targetVal.url);
    if (variables.length === 0)
        return results;
    const missingVariables = getMissingProps(variables, targetVal.variables);
    if (missingVariables.length) {
        results.push({
            message: `Not all server's variables are described with "variables" object. Missed: ${missingVariables.join(', ')}.`,
            path: [...ctx.path, 'variables'],
        });
    }
    const redundantVariables = getRedundantProps(variables, targetVal.variables);
    if (redundantVariables.length) {
        redundantVariables.forEach(variable => {
            results.push({
                message: `Server's "variables" object has redundant defined "${variable}" url variable.`,
                path: [...ctx.path, 'variables', variable],
            });
        });
    }
    return results;
});
