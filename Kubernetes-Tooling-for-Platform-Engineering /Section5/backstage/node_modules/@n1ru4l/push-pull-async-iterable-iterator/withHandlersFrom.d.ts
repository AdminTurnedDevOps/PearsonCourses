/**
 * Attaches a cleanup handler from and AsyncIterable to an AsyncIterable.
 *
 * @param source
 * @param target
 */
export declare function withHandlersFrom<TValue>(
/** The source that should be returned with attached handlers. */
source: AsyncIterable<TValue>, 
/**The target on which the return and throw methods should be called. */
target: AsyncIterableIterator<unknown>): AsyncGenerator<TValue, void, unknown>;
