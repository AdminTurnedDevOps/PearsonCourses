import { GraphQLNamedType } from 'graphql';
import './type-documentation.css';
declare type TypeDocumentationProps = {
    /**
     * The type that should be rendered.
     */
    type: GraphQLNamedType;
};
export declare function TypeDocumentation(props: TypeDocumentationProps): import("react/jsx-runtime").JSX.Element | null;
export {};
