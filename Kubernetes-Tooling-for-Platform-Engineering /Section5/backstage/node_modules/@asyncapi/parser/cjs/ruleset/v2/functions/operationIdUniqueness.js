"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationIdUniqueness = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const utils_1 = require("../utils");
const utils_2 = require("../../../utils");
function retrieveOperationId(operation) {
    if (Array.isArray(operation.traits)) {
        for (let i = operation.traits.length - 1; i >= 0; i--) {
            const trait = operation.traits[i];
            if ((0, utils_2.isObject)(trait) && typeof trait.operationId === 'string') {
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
exports.operationIdUniqueness = (0, spectral_core_1.createRulesetFunction)({
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
    const operations = (0, utils_1.getAllOperations)(targetVal);
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
