import { createRulesetFunction } from '@stoplight/spectral-core';
import { getAllOperations } from '../utils';
import { isObject } from '../../../utils';
function retrieveOperationId(operation) {
    if (Array.isArray(operation.traits)) {
        for (let i = operation.traits.length - 1; i >= 0; i--) {
            const trait = operation.traits[i];
            if (isObject(trait) && typeof trait.operationId === 'string') {
                return {
                    operationId: trait.operationId,
                    path: ['traits', i, 'operationId'],
                };
            }
        }
    }
    if (typeof operation.operationId === 'string') {
        return {
            operationId: operation.operationId,
            path: ['operationId'],
        };
    }
    return undefined;
}
export const operationIdUniqueness = createRulesetFunction({
    input: {
        type: 'object',
        properties: {
            channels: {
                type: 'object',
                properties: {
                    subscribe: {
                        type: 'object',
                    },
                    publish: {
                        type: 'object',
                    },
                },
            },
        },
    },
    options: null,
}, (targetVal) => {
    const results = [];
    const operations = getAllOperations(targetVal);
    const seenIds = [];
    for (const { path, operation } of operations) {
        const maybeOperationId = retrieveOperationId(operation);
        if (maybeOperationId === undefined) {
            continue;
        }
        if (seenIds.includes(maybeOperationId.operationId)) {
            results.push({
                message: '"operationId" must be unique across all the operations.',
                path: [...path, ...maybeOperationId.path],
            });
        }
        else {
            seenIds.push(maybeOperationId.operationId);
        }
    }
    return results;
});
