import type { DocumentNode, IntrospectionQuery } from 'graphql';
import type { Client, ClientOptions, ExecutionResult } from 'graphql-ws';
export declare type Observable<T> = {
    subscribe(opts: {
        next: (value: T) => void;
        error: (error: any) => void;
        complete: () => void;
    }): Unsubscribable;
    subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Unsubscribable;
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
};
export declare type Unsubscribable = {
    unsubscribe: () => void;
};
export declare type FetcherParams = {
    query: string;
    operationName?: string | null;
    variables?: any;
};
export declare type FetcherOpts = {
    headers?: {
        [key: string]: any;
    };
    documentAST?: DocumentNode;
};
export declare type ExecutionResultPayload = {
    data: IntrospectionQuery;
    errors?: Array<any>;
} | {
    data?: any;
    errors?: Array<any>;
} | {
    data?: any;
    errors?: Array<any>;
    hasNext: boolean;
} | {
    data?: any;
    errors?: any[];
    path: (string | number)[];
    hasNext: boolean;
};
export declare type FetcherResultPayload = ExecutionResultPayload;
export declare type MaybePromise<T> = T | Promise<T>;
export declare type FetcherResult = ExecutionResult | {
    data: IntrospectionQuery;
};
export declare type SyncExecutionResult = ExecutionResult | Observable<ExecutionResult> | AsyncIterable<ExecutionResult>;
export declare type SyncFetcherResult = SyncExecutionResult;
export declare type FetcherReturnType = MaybePromise<SyncExecutionResult>;
export declare type Fetcher = (graphQLParams: FetcherParams, opts?: FetcherOpts) => FetcherReturnType;
export interface CreateFetcherOptions {
    url: string;
    subscriptionUrl?: string;
    wsClient?: Client;
    legacyWsClient?: any;
    legacyClient?: any;
    headers?: Record<string, string>;
    wsConnectionParams?: ClientOptions['connectionParams'];
    enableIncrementalDelivery?: boolean;
    fetch?: typeof fetch;
    schemaFetcher?: Fetcher;
}
//# sourceMappingURL=types.d.ts.map