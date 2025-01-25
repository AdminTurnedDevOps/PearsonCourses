"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOperations = void 0;
const utils_1 = require("../../../utils");
function* getAllOperations(asyncapi) {
    const channels = asyncapi === null || asyncapi === void 0 ? void 0 : asyncapi.channels;
    if (!(0, utils_1.isObject)(channels)) {
        return {};
    }
    for (const [channelAddress, channel] of Object.entries(channels)) {
        if (!(0, utils_1.isObject)(channel)) {
            continue;
        }
        if ((0, utils_1.isObject)(channel.subscribe)) {
            yield {
                path: ['channels', channelAddress, 'subscribe'],
                kind: 'subscribe',
                operation: channel.subscribe,
            };
        }
        if ((0, utils_1.isObject)(channel.publish)) {
            yield {
                path: ['channels', channelAddress, 'publish'],
                kind: 'publish',
                operation: channel.publish,
            };
        }
    }
}
exports.getAllOperations = getAllOperations;
