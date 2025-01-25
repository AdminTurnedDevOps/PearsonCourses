import { Sink } from "./Sink";
export declare function applyAsyncIterableIteratorToSink<TValue = unknown, TError = unknown>(asyncIterableIterator: AsyncIterableIterator<TValue>, sink: Sink<TValue, TError>): () => void;
