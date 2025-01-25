export function applyAsyncIterableIteratorToSink(asyncIterableIterator, sink) {
    const run = async () => {
        try {
            for await (const value of asyncIterableIterator) {
                sink.next(value);
            }
            sink.complete();
        }
        catch (err) {
            sink.error(err);
        }
    };
    run();
    return () => {
        var _a;
        (_a = asyncIterableIterator.return) === null || _a === void 0 ? void 0 : _a.call(asyncIterableIterator);
    };
}
//# sourceMappingURL=applyAsyncIterableIteratorToSink.js.map