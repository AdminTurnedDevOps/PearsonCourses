"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationMessagesUnambiguity = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const referenceSchema = {
    type: 'object',
    properties: {
        $ref: {
            type: 'string',
            format: 'uri-reference'
        },
    },
};
exports.operationMessagesUnambiguity = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            channel: referenceSchema,
            messages: {
                type: 'array',
                items: referenceSchema,
            },
        },
    },
    options: null,
}, (targetVal, _, ctx) => {
    var _a, _b;
    const results = [];
    const channelPointer = (_a = targetVal.channel) === null || _a === void 0 ? void 0 : _a.$ref; // required
    (_b = targetVal.messages) === null || _b === void 0 ? void 0 : _b.forEach((message, index) => {
        if (!message.$ref.startsWith(`${channelPointer}/messages`)) {
            results.push({
                message: 'Operation message does not belong to the specified channel.',
                path: [...ctx.path, 'messages', index],
            });
        }
    });
    return results;
});
