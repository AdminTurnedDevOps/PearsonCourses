export declare type PushPullAsyncIterableIterator<T> = {
    pushValue: (value: T) => void;
    asyncIterableIterator: AsyncGenerator<T, void>;
};
/**
 * makePushPullAsyncIterableIterator
 *
 * The iterable will publish values until return or throw is called.
 * Afterwards it is in the completed state and cannot be used for publishing any further values.
 * It will handle back-pressure and keep pushed values until they are consumed by a source.
 */
export declare function makePushPullAsyncIterableIterator<T>(): PushPullAsyncIterableIterator<T>;
