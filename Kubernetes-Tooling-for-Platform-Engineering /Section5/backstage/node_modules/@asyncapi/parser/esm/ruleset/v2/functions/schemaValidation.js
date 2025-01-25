import { createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';
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
export const schemaValidation = createRulesetFunction({
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
        const result = schemaFn(relevantItem.value, {
            schema: schemaObject,
            allErrors: true,
        }, Object.assign(Object.assign({}, context), { path: [...context.path, ...relevantItem.path] }));
        if (Array.isArray(result)) {
            results.push(...result);
        }
    }
    return results;
});
