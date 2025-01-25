import { FetcherResult, FetcherReturnType, Observable } from '../create-fetcher';
export declare function isPromise<T>(value: Promise<T> | any): value is Promise<T>;
export declare function isObservable<T>(value: any): value is Observable<T>;
export declare function isAsyncIterable(input: unknown): input is AsyncIterable<unknown>;
export declare function fetcherReturnToPromise(fetcherResult: FetcherReturnType): Promise<FetcherResult>;
//# sourceMappingURL=index.d.ts.map