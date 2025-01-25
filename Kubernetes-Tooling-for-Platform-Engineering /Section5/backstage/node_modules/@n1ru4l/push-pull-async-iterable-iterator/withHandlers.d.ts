/**
 * Attaches a cleanup handler to a AsyncIterable.
 *
 * @param source The source that should have a return handler attached
 * @param onReturn The return handler that should be attached
 * @returns
 */
export declare function withHandlers<TValue, TError = unknown>(source: AsyncIterable<TValue>, onReturn?: () => void, onThrow?: (err: TError) => void): AsyncGenerator<TValue, void, unknown>;
