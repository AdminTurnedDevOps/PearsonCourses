"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMessages = void 0;
const utils_1 = require("../../../utils");
const getAllOperations_1 = require("./getAllOperations");
function* getAllMessages(asyncapi) {
    for (const { path, operation } of (0, getAllOperations_1.getAllOperations)(asyncapi)) {
        if (!(0, utils_1.isObject)(operation)) {
            continue;
        }
        const maybeMessage = operation.message;
        if (!(0, utils_1.isObject)(maybeMessage)) {
            continue;
        }
        const oneOf = maybeMessage.oneOf;
        if (Array.isArray(oneOf)) {
            for (const [index, message] of oneOf.entries()) {
                if ((0, utils_1.isObject)(message)) {
                    yield {
                        path: [...path, 'message', 'oneOf', index],
                        message,
                    };
                }
            }
        }
        else {
            yield {
                path: [...path, 'message'],
                message: maybeMessage,
            };
        }
    }
}
exports.getAllMessages = getAllMessages;
