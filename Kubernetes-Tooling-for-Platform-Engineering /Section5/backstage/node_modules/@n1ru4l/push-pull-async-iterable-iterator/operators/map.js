/**
 * Map the events published by an AsyncIterable.
 */
export const map = (map) => async function* mapGenerator(asyncIterable) {
    for await (const value of asyncIterable) {
        yield map(value);
    }
};
//# sourceMappingURL=map.js.map