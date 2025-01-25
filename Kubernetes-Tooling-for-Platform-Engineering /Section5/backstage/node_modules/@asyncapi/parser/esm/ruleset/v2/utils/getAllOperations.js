import { isObject } from '../../../utils';
export function* getAllOperations(asyncapi) {
    const channels = asyncapi === null || asyncapi === void 0 ? void 0 : asyncapi.channels;
    if (!isObject(channels)) {
        return {};
    }
    for (const [channelAddress, channel] of Object.entries(channels)) {
        if (!isObject(channel)) {
            continue;
        }
        if (isObject(channel.subscribe)) {
            yield {
                path: ['channels', channelAddress, 'subscribe'],
                kind: 'subscribe',
                operation: channel.subscribe,
            };
        }
        if (isObject(channel.publish)) {
            yield {
                path: ['channels', channelAddress, 'publish'],
                kind: 'publish',
                operation: channel.publish,
            };
        }
    }
}
