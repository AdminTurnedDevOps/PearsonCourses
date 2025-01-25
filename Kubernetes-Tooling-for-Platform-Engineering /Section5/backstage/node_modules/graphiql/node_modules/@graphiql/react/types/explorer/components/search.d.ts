import { GraphQLArgument, GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql';
import './search.css';
export declare function Search(): import("react/jsx-runtime").JSX.Element | null;
declare type TypeMatch = {
    type: GraphQLNamedType;
};
declare type FieldMatch = {
    type: GraphQLNamedType;
    field: GraphQLField<unknown, unknown> | GraphQLInputField;
    argument?: GraphQLArgument;
};
export declare function useSearchResults(caller?: Function): (searchValue: string) => {
    within: FieldMatch[];
    types: TypeMatch[];
    fields: FieldMatch[];
};
export {};
