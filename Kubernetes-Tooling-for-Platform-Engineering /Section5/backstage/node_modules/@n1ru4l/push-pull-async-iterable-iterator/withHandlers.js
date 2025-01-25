/**
 * Attaches a cleanup handler to a AsyncIterable.
 *
 * @param source The source that should have a return handler attached
 * @param onReturn The return handler that should be attached
 * @returns
 */
export function withHandlers(source, onReturn, onThrow) {
    const stream = (async function* withReturnSource() {
        yield* source;
    })();
    const originalReturn = stream.return.bind(stream);
    if (onReturn) {
        stream.return = (...args) => {
            onReturn();
            return originalReturn(...args);
        };
    }
    if (onThrow) {
        const originalThrow = stream.throw.bind(stream);
        stream.throw = (err) => {
            onThrow(err);
            return originalThrow(err);
        };
    }
    return stream;
}
//# sourceMappingURL=withHandlers.js.map