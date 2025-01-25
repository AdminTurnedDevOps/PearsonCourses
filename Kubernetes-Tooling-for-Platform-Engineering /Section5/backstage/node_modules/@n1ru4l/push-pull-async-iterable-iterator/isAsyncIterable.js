export function isAsyncIterable(input) {
    return (typeof input === "object" &&
        input !== null &&
        // The AsyncGenerator check is for Safari on iOS which currently does not have
        // Symbol.asyncIterator implemented
        // That means every custom AsyncIterable must be built using a AsyncGeneratorFunction (async function * () {})
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (input[Symbol.toStringTag] === "AsyncGenerator" ||
            (Symbol.asyncIterator && Symbol.asyncIterator in input)));
}
//# sourceMappingURL=isAsyncIterable.js.map