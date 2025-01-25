/**
 * Filter the events published by an AsyncIterable.
 */
export declare function filter<T, U extends T>(filter: (input: T) => input is U): (asyncIterable: AsyncIterable<T>) => AsyncGenerator<U, void, unknown>;
export declare function filter<T>(filter: (input: T) => boolean): (asyncIterable: AsyncIterable<T>) => AsyncGenerator<T, void, unknown>;
