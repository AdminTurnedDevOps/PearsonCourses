/**
 * istanbul ignore next
 *
 * This block can be ignored because we are not testing
 * the built in window BroadcastChannel, only this polyfill.
 */
export declare const BroadcastChannel: {
    new (name: string): BroadcastChannel;
    prototype: BroadcastChannel;
};
