import { Fetcher } from '@graphiql/toolkit';
import { ReactNode } from 'react';
import { UseAutoCompleteLeafsArgs } from './editor/hooks';
export declare type ExecutionContextType = {
    /**
     * If there is currently a GraphQL request in-flight. For multi-part
     * requests like subscriptions, this will be `true` while fetching the
     * first partial response and `false` while fetching subsequent batches.
     */
    isFetching: boolean;
    /**
     * If there is currently a GraphQL request in-flight. For multi-part
     * requests like subscriptions, this will be `true` until the last batch
     * has been fetched or the connection is closed from the client.
     */
    isSubscribed: boolean;
    /**
     * The operation name that will be sent with all GraphQL requests.
     */
    operationName: string | null;
    /**
     * Start a GraphQL requests based of the current editor contents.
     */
    run(): void;
    /**
     * Stop the GraphQL request that is currently in-flight.
     */
    stop(): void;
};
export declare const ExecutionContext: import("react").Context<ExecutionContextType | null>;
export declare type ExecutionContextProviderProps = Pick<UseAutoCompleteLeafsArgs, 'getDefaultFieldNames'> & {
    children: ReactNode;
    /**
     * A function which accepts GraphQL HTTP parameters and returns a `Promise`,
     * `Observable` or `AsyncIterable` that returns the GraphQL response in
     * parsed JSON format.
     *
     * We suggest using the `createGraphiQLFetcher` utility from `@graphiql/toolkit`
     * to create these fetcher functions.
     *
     * @see {@link https://graphiql-test.netlify.app/typedoc/modules/graphiql_toolkit.html#creategraphiqlfetcher-2|`createGraphiQLFetcher`}
     */
    fetcher: Fetcher;
    /**
     * This prop sets the operation name that is passed with a GraphQL request.
     */
    operationName?: string;
};
export declare function ExecutionContextProvider({ fetcher, getDefaultFieldNames, children, operationName, }: ExecutionContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useExecutionContext: {
    (options: {
        nonNull: true;
        caller?: Function | undefined;
    }): ExecutionContextType;
    (options: {
        nonNull?: boolean | undefined;
        caller?: Function | undefined;
    }): ExecutionContextType | null;
    (): ExecutionContextType | null;
};
