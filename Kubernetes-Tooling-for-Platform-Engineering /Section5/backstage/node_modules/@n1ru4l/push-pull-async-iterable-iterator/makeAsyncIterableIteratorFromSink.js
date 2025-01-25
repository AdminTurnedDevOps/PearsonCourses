import { makePushPullAsyncIterableIterator } from "./makePushPullAsyncIterableIterator";
export const makeAsyncIterableIteratorFromSink = (make) => {
    const { pushValue, asyncIterableIterator } = makePushPullAsyncIterableIterator();
    const dispose = make({
        next: (value) => {
            pushValue(value);
        },
        complete: () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            asyncIterableIterator.return();
        },
        error: (err) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            asyncIterableIterator.throw(err);
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const originalReturn = asyncIterableIterator.return;
    let returnValue = undefined;
    asyncIterableIterator.return = () => {
        if (returnValue === undefined) {
            dispose();
            returnValue = originalReturn();
        }
        return returnValue;
    };
    return asyncIterableIterator;
};
//# sourceMappingURL=makeAsyncIterableIteratorFromSink.js.map