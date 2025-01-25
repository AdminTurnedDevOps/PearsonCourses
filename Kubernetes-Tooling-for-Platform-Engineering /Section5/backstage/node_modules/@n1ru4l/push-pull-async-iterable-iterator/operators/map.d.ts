/**
 * Map the events published by an AsyncIterable.
 */
export declare const map: <T, O>(map: (input: T) => O | Promise<O>) => (asyncIterable: AsyncIterable<T>) => AsyncGenerator<O, void, unknown>;
