import { withHandlers } from "./withHandlers";
function createDeferred() {
    const d = {};
    d.promise = new Promise((resolve, reject) => {
        d.resolve = resolve;
        d.reject = reject;
    });
    return d;
}
/**
 * makePushPullAsyncIterableIterator
 *
 * The iterable will publish values until return or throw is called.
 * Afterwards it is in the completed state and cannot be used for publishing any further values.
 * It will handle back-pressure and keep pushed values until they are consumed by a source.
 */
export function makePushPullAsyncIterableIterator() {
    let state = {
        type: "running" /* running */
    };
    let next = createDeferred();
    const values = [];
    function pushValue(value) {
        if (state.type !== "running" /* running */) {
            return;
        }
        values.push(value);
        next.resolve();
        next = createDeferred();
    }
    const source = (async function* PushPullAsyncIterableIterator() {
        while (true) {
            if (values.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                yield values.shift();
            }
            else {
                if (state.type === "error" /* error */) {
                    throw state.error;
                }
                if (state.type === "finished" /* finished */) {
                    return;
                }
                await next.promise;
            }
        }
    })();
    const stream = withHandlers(source, () => {
        if (state.type !== "running" /* running */) {
            return;
        }
        state = {
            type: "finished" /* finished */
        };
        next.resolve();
    }, (error) => {
        if (state.type !== "running" /* running */) {
            return;
        }
        state = {
            type: "error" /* error */,
            error
        };
        next.resolve();
    });
    return {
        pushValue,
        asyncIterableIterator: stream
    };
}
//# sourceMappingURL=makePushPullAsyncIterableIterator.js.map