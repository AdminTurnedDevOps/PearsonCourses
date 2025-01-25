export function filter(filter) {
    return async function* filterGenerator(asyncIterable) {
        for await (const value of asyncIterable) {
            if (filter(value)) {
                yield value;
            }
        }
    };
}
//# sourceMappingURL=filter.js.map