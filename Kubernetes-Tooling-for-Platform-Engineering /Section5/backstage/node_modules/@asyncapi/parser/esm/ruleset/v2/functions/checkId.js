import { createRulesetFunction } from '@stoplight/spectral-core';
import { truthy } from '@stoplight/spectral-functions';
import { mergeTraits } from '../../utils';
export const checkId = createRulesetFunction({
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
    const mergedValue = mergeTraits(targetVal);
    return truthy(mergedValue[options.idField], null, ctx);
});
