import type { Diagnostic as DiagnosticType, CompletionItem as CompletionItemType } from 'vscode-languageserver-types';
export { InsertTextFormat } from 'vscode-languageserver-types';
import type { ASTNode, GraphQLSchema, DocumentNode, FragmentDefinitionNode, NamedTypeNode, TypeDefinitionNode, NameNode, GraphQLArgument, GraphQLEnumValue, GraphQLField, GraphQLInputFieldMap, GraphQLInterfaceType, GraphQLObjectType, GraphQLType, GraphQLDirective } from 'graphql';
export declare type Maybe<T> = T | null | undefined;
import type { GraphQLConfig, GraphQLProjectConfig, GraphQLExtensionDeclaration } from 'graphql-config';
export { GraphQLDocumentMode } from './parser';
export type { GraphQLConfig, GraphQLProjectConfig, GraphQLExtensionDeclaration, };
export interface GraphQLCache {
    getGraphQLConfig: () => GraphQLConfig;
    getProjectForFile: (uri: string) => GraphQLProjectConfig | void;
    getObjectTypeDependenciesForAST: (parsedQuery: ASTNode, fragmentDefinitions: Map<string, ObjectTypeInfo>) => Promise<ObjectTypeInfo[]>;
    getObjectTypeDefinitions: (graphQLConfig: GraphQLProjectConfig) => Promise<Map<string, ObjectTypeInfo>>;
    updateObjectTypeDefinition: (rootDir: Uri, filePath: Uri, contents: CachedContent[]) => Promise<void>;
    getFragmentDependencies: (query: string, fragmentDefinitions: Maybe<Map<string, FragmentInfo>>) => Promise<FragmentInfo[]>;
    getFragmentDependenciesForAST: (parsedQuery: ASTNode, fragmentDefinitions: Map<string, FragmentInfo>) => Promise<FragmentInfo[]>;
    getFragmentDefinitions: (graphQLConfig: GraphQLProjectConfig) => Promise<Map<string, FragmentInfo>>;
    updateFragmentDefinition: (rootDir: Uri, filePath: Uri, contents: CachedContent[]) => Promise<void>;
    getSchema: (appName: string, queryHasExtensions?: boolean) => Promise<GraphQLSchema | null>;
}
export interface IPosition {
    line: number;
    character: number;
    setLine(line: number): void;
    setCharacter(character: number): void;
    lessThanOrEqualTo(position: IPosition): boolean;
}
export interface IRange {
    start: IPosition;
    end: IPosition;
    setEnd(line: number, character: number): void;
    setStart(line: number, character: number): void;
    containsPosition(position: IPosition): boolean;
}
export declare type CachedContent = {
    query: string;
    range: IRange | null;
};
export declare type Uri = string;
export declare type GraphQLFileMetadata = {
    filePath: Uri;
    size: number;
    mtime: number;
};
export declare type GraphQLFileInfo = {
    filePath: Uri;
    content: string;
    asts: DocumentNode[];
    queries: CachedContent[];
    size: number;
    mtime: number;
};
export declare type AllTypeInfo = {
    type: Maybe<GraphQLType>;
    parentType: Maybe<GraphQLType>;
    inputType: Maybe<GraphQLType>;
    directiveDef: Maybe<GraphQLDirective>;
    fieldDef: Maybe<GraphQLField<any, any>>;
    enumValue: Maybe<GraphQLEnumValue>;
    argDef: Maybe<GraphQLArgument>;
    argDefs: Maybe<GraphQLArgument[]>;
    objectFieldDefs: Maybe<GraphQLInputFieldMap>;
    interfaceDef: Maybe<GraphQLInterfaceType>;
    objectTypeDef: Maybe<GraphQLObjectType>;
};
export declare type FragmentInfo = {
    filePath?: Uri;
    content: string;
    definition: FragmentDefinitionNode;
};
export declare type NamedTypeInfo = {
    filePath?: Uri;
    content: string;
    definition: NamedTypeNode;
};
export declare type ObjectTypeInfo = {
    filePath?: Uri;
    content: string;
    definition: TypeDefinitionNode;
};
export declare type Diagnostic = DiagnosticType;
export declare type CompletionItemBase = {
    label: string;
    isDeprecated?: boolean;
};
export declare type CompletionItem = CompletionItemType & {
    isDeprecated?: boolean;
    documentation?: string | null;
    deprecationReason?: string | null;
    type?: GraphQLType;
    command?: CompletionItemType['command'];
    rawInsert?: string;
};
export declare type Definition = {
    path: Uri;
    position: IPosition;
    range?: IRange;
    id?: string;
    name?: string;
    language?: string;
    projectRoot?: Uri;
    locator?: string;
};
export declare type TokenKind = 'keyword' | 'class-name' | 'constructor' | 'method' | 'param' | 'string' | 'whitespace' | 'plain' | 'type';
export declare type TextToken = {
    kind: TokenKind;
    value: string | NameNode;
};
export declare type TokenizedText = TextToken[];
export declare type OutlineTree = {
    plainText?: string;
    tokenizedText?: TokenizedText;
    representativeName?: string;
    kind: string;
    startPosition: IPosition;
    endPosition?: IPosition;
    children: OutlineTree[];
};
export declare type Outline = {
    outlineTrees: OutlineTree[];
};
export interface FileEvent {
    uri: string;
    type: FileChangeType;
}
export declare const FileChangeTypeKind: {
    Created: number;
    Changed: number;
    Deleted: number;
};
export declare type FileChangeTypeKind = {
    Created: 1;
    Changed: 2;
    Deleted: 3;
};
export declare type FileChangeTypeKeys = keyof FileChangeTypeKind;
export declare type FileChangeType = FileChangeTypeKind[FileChangeTypeKeys];
export declare namespace CompletionItemKind {
    const Text = 1;
    const Method = 2;
    const Function = 3;
    const Constructor = 4;
    const Field = 5;
    const Variable = 6;
    const Class = 7;
    const Interface = 8;
    const Module = 9;
    const Property = 10;
    const Unit = 11;
    const Value = 12;
    const Enum = 13;
    const Keyword = 14;
    const Snippet = 15;
    const Color = 16;
    const File = 17;
    const Reference = 18;
    const Folder = 19;
    const EnumMember = 20;
    const Constant = 21;
    const Struct = 22;
    const Event = 23;
    const Operator = 24;
    const TypeParameter = 25;
}
export declare type CompletionItemKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
//# sourceMappingURL=types.d.ts.map