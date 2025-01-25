import { GraphQLField, GraphQLType } from 'graphql';
import { CompletionItemBase } from '../types';
import { ContextTokenUnion } from '../parser';
export declare function objectValues<T>(object: Record<string, T>): Array<T>;
export declare function hintList<T extends CompletionItemBase>(token: ContextTokenUnion, list: Array<T>): Array<T>;
export declare const getInsertText: (prefix: string, type?: GraphQLType, fallback?: string) => string;
export declare const getInputInsertText: (prefix: string, type: GraphQLType, fallback?: string) => string;
export declare const getFieldInsertText: (field: GraphQLField<null, null>) => string | undefined;
//# sourceMappingURL=autocompleteUtils.d.ts.map