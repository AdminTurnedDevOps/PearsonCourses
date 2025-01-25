import type { GraphQLSchema } from 'graphql';
import './schema-documentation.css';
declare type SchemaDocumentationProps = {
    /**
     * The schema that should be rendered.
     */
    schema: GraphQLSchema;
};
export declare function SchemaDocumentation(props: SchemaDocumentationProps): import("react/jsx-runtime").JSX.Element;
export {};
