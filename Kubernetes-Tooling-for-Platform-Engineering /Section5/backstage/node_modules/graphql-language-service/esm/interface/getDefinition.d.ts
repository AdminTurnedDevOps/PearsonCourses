import { ASTNode, FragmentSpreadNode, FragmentDefinitionNode, OperationDefinitionNode, NamedTypeNode, GraphQLType } from 'graphql';
import { Definition, FragmentInfo, Uri, ObjectTypeInfo } from '../types';
import { Range } from '../utils';
export declare type DefinitionQueryResult = {
    queryRange: Range[];
    definitions: Definition[];
    printedName?: string;
};
export declare type DefinitionQueryResponse = DefinitionQueryResult & {
    node?: ASTNode | null;
    type?: GraphQLType | null;
};
export declare const LANGUAGE = "GraphQL";
export declare function getDefinitionQueryResultForNamedType(text: string, node: NamedTypeNode, dependencies: Array<ObjectTypeInfo>): Promise<DefinitionQueryResult>;
export declare function getDefinitionQueryResultForField(fieldName: string, typeName: string, dependencies: Array<ObjectTypeInfo>): Promise<DefinitionQueryResult>;
export declare function getDefinitionQueryResultForArgument(argumentName: string, fieldName: string, typeName: string, dependencies: Array<ObjectTypeInfo>): Promise<DefinitionQueryResult>;
export declare function getDefinitionQueryResultForFragmentSpread(text: string, fragment: FragmentSpreadNode, dependencies: Array<FragmentInfo>): Promise<DefinitionQueryResult>;
export declare function getDefinitionQueryResultForDefinitionNode(path: Uri, text: string, definition: FragmentDefinitionNode | OperationDefinitionNode): DefinitionQueryResult;
//# sourceMappingURL=getDefinition.d.ts.map