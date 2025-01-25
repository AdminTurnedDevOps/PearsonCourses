"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageIdUniqueness = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const utils_1 = require("../utils");
const utils_2 = require("../../../utils");
function retrieveMessageId(message) {
    if (Array.isArray(message.traits)) {
        for (let i = message.traits.length - 1; i >= 0; i--) {
            const trait = message.traits[i];
            if ((0, utils_2.isObject)(trait) && typeof trait.messageId === 'string') {
                return {
                    messageId: trait.messageId,
                    path: ['traits', i, 'messageId'],
                };
            }
        }
    }
    if (typeof message.messageId === 'string') {
        return {
            messageId: message.messageId,
            path: ['messageId'],
        };
    }
    return undefined;
}
exports.messageIdUniqueness = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            channels: {
                type: 'object',
                properties: {
                    subscribe: {
                        type: 'object',
                        properties: {
                            message: {
                                oneOf: [
                                    { type: 'object' },
                                    {
                                        type: 'object',
                                        properties: {
                                            oneOf: {
                                                type: 'array',
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    publish: {
                        type: 'object',
                        properties: {
                            message: {
                                oneOf: [
                                    { type: 'object' },
                                    {
                                        type: 'object',
                                        properties: {
                                            oneOf: {
                                                type: 'array',
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    },
    options: null,
}, (targetVal) => {
    const results = [];
    const messages = (0, utils_1.getAllMessages)(targetVal);
    const seenIds = [];
    for (const { path, message } of messages) {
        const maybeMessageId = retrieveMessageId(message);
        if (maybeMessageId === undefined) {
            continue;
        }
        if (seenIds.includes(maybeMessageId.messageId)) {
            results.push({
                message: '"messageId" must be unique across all the messages.',
                path: [...path, ...maybeMessageId.path],
            });
        }
        else {
            seenIds.push(maybeMessageId.messageId);
        }
    }
    return results;
});
