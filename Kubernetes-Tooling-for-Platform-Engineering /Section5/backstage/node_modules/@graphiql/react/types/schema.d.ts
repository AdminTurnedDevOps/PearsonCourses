import { Fetcher } from '@graphiql/toolkit';
import { GraphQLError, GraphQLSchema, IntrospectionQuery } from 'graphql';
import { ReactNode } from 'react';
declare type MaybeGraphQLSchema = GraphQLSchema | null | undefined;
export declare type SchemaContextType = {
    /**
     * Stores an error raised during introspecting or building the GraphQL schema
     * from the introspection result.
     */
    fetchError: string | null;
    /**
     * Trigger building the GraphQL schema. This might trigger an introspection
     * request if no schema is passed via props and if using a schema is not
     * explicitly disabled by passing `null` as value for the `schema` prop. If
     * there is a schema (either fetched using introspection or passed via props)
     * it will be validated, unless this is explicitly skipped using the
     * `dangerouslyAssumeSchemaIsValid` prop.
     */
    introspect(): void;
    /**
     * If there currently is an introspection request in-flight.
     */
    isFetching: boolean;
    /**
     * The current GraphQL schema.
     */
    schema: MaybeGraphQLSchema;
    /**
     * A list of errors from validating the current GraphQL schema. The schema is
     * valid if and only if this list is empty.
     */
    validationErrors: readonly GraphQLError[];
};
export declare const SchemaContext: import("react").Context<SchemaContextType | null>;
export declare type SchemaContextProviderProps = {
    children: ReactNode;
    /**
     * This prop can be used to skip validating the GraphQL schema. This applies
     * to both schemas fetched via introspection and schemas explicitly passed
     * via the `schema` prop.
     *
     * IMPORTANT NOTE: Without validating the schema, GraphiQL and its components
     * are vulnerable to numerous exploits and might break. Only use this prop if
     * you have full control over the schema passed to GraphiQL.
     *
     * @default false
     */
    dangerouslyAssumeSchemaIsValid?: boolean;
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
     * Invoked after a new GraphQL schema was built. This includes both fetching
     * the schema via introspection and passing the schema using the `schema`
     * prop.
     * @param schema The GraphQL schema that is now used for GraphiQL.
     */
    onSchemaChange?(schema: GraphQLSchema): void;
    /**
     * Explicitly provide the GraphiQL schema that shall be used for GraphiQL.
     * If this props is...
     * - ...passed and the value is a GraphQL schema, it will be validated and
     *   then used for GraphiQL if it is valid.
     * - ...passed and the value is the result of an introspection query, a
     *   GraphQL schema will be built from this introspection data, it will be
     *   validated, and then used for GraphiQL if it is valid.
     * - ...set to `null`, no introspection request will be triggered and
     *   GraphiQL will run without a schema.
     * - ...set to `undefined` or not set at all, an introspection request will
     *   be triggered. If this request succeeds, a GraphQL schema will be built
     *   from the returned introspection data, it will be validated, and then
     *   used for GraphiQL if it is valid. If this request fails, GraphiQL will
     *   run without a schema.
     */
    schema?: GraphQLSchema | IntrospectionQuery | null;
} & IntrospectionArgs;
export declare function SchemaContextProvider(props: SchemaContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useSchemaContext: {
    (options: {
        nonNull: true;
        caller?: Function | undefined;
    }): SchemaContextType;
    (options: {
        nonNull?: boolean | undefined;
        caller?: Function | undefined;
    }): SchemaContextType | null;
    (): SchemaContextType | null;
};
declare type IntrospectionArgs = {
    /**
     * Can be used to set the equally named option for introspecting a GraphQL
     * server.
     * @default false
     * @see {@link https://github.com/graphql/graphql-js/blob/main/src/utilities/getIntrospectionQuery.ts|Utility for creating the introspection query}
     */
    inputValueDeprecation?: boolean;
    /**
     * Can be used to set a custom operation name for the introspection query.
     */
    introspectionQueryName?: string;
    /**
     * Can be used to set the equally named option for introspecting a GraphQL
     * server.
     * @default false
     * @see {@link https://github.com/graphql/graphql-js/blob/main/src/utilities/getIntrospectionQuery.ts|Utility for creating the introspection query}
     */
    schemaDescription?: boolean;
};
export {};
