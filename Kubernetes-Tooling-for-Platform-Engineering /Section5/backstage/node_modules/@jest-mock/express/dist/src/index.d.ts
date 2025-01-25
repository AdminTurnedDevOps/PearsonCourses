/// <reference types="jest" />
export interface EventEventEmitter {
    addListener?: jest.Mock;
    on?: jest.Mock;
    once?: jest.Mock;
    removeListener?: jest.Mock;
    off?: jest.Mock;
    removeAllListeners?: jest.Mock;
    setMaxListeners?: jest.Mock;
    getMaxListeners?: jest.Mock;
    listeners?: jest.Mock;
    rawListeners?: jest.Mock;
    emit?: jest.Mock;
    listenerCount?: jest.Mock;
    prependListener?: jest.Mock;
    prependOnceListener?: jest.Mock;
    eventNames?: jest.Mock;
}
