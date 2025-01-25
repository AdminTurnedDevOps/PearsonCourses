import { IPosition } from '..';
import { CharacterStream, ContextToken, State, getTypeInfo } from '.';
import { GraphQLSchema, Kind } from 'graphql';
export declare type ParserCallbackFn = (stream: CharacterStream, state: State, style: string, index: number) => void | 'BREAK';
export declare function runOnlineParser(queryText: string, callback: ParserCallbackFn): ContextToken;
export declare enum GraphQLDocumentMode {
    TYPE_SYSTEM = "TYPE_SYSTEM",
    EXECUTABLE = "EXECUTABLE",
    UNKNOWN = "UNKNOWN"
}
export declare const TYPE_SYSTEM_KINDS: Kind[];
export declare function getDocumentMode(documentText: string, uri?: string): GraphQLDocumentMode;
export declare function getTokenAtPosition(queryText: string, cursor: IPosition, offset?: number): ContextToken;
export declare function getContextAtPosition(queryText: string, cursor: IPosition, schema: GraphQLSchema, contextToken?: ContextToken, options?: {
    mode?: GraphQLDocumentMode;
    uri?: string;
}): {
    token: ContextToken;
    state: State;
    typeInfo: ReturnType<typeof getTypeInfo>;
    mode: GraphQLDocumentMode;
} | null;
//# sourceMappingURL=api.d.ts.map