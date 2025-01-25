import { DocumentNode } from 'graphql';
import { Client, ClientOptions, ExecutionResult } from 'graphql-ws';
import type { Fetcher, FetcherParams, FetcherOpts, CreateFetcherOptions } from './types';
export declare const isSubscriptionWithName: (document: DocumentNode, name: string | undefined) => boolean;
export declare const createSimpleFetcher: (options: CreateFetcherOptions, httpFetch: typeof fetch) => Fetcher;
export declare const createWebsocketsFetcherFromUrl: (url: string, connectionParams?: ClientOptions['connectionParams']) => ((graphQLParams: FetcherParams) => AsyncIterableIterator<ExecutionResult<Record<string, unknown>, Record<string, unknown>>>) | undefined;
export declare const createWebsocketsFetcherFromClient: (wsClient: Client) => (graphQLParams: FetcherParams) => AsyncIterableIterator<ExecutionResult<Record<string, unknown>, Record<string, unknown>>>;
export declare const createLegacyWebsocketsFetcher: (legacyWsClient: {
    request: (params: FetcherParams) => unknown;
}) => (graphQLParams: FetcherParams) => AsyncIterableIterator<ExecutionResult<Record<string, unknown>, Record<string, unknown>>>;
export declare const createMultipartFetcher: (options: CreateFetcherOptions, httpFetch: typeof fetch) => Fetcher;
export declare const getWsFetcher: (options: CreateFetcherOptions, fetcherOpts: FetcherOpts | undefined) => ((graphQLParams: FetcherParams) => AsyncIterableIterator<ExecutionResult<Record<string, unknown>, Record<string, unknown>>>) | undefined;
//# sourceMappingURL=lib.d.ts.map