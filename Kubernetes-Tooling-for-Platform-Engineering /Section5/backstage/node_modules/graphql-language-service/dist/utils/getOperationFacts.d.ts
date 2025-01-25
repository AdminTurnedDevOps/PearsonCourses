import type { VariableToType } from './collectVariables';
import type { GraphQLSchema, DocumentNode, OperationDefinitionNode } from 'graphql';
export declare type OperationASTFacts = {
    variableToType?: VariableToType;
    operations: OperationDefinitionNode[];
};
export declare function getOperationASTFacts(documentAST: DocumentNode, schema?: GraphQLSchema | null): OperationASTFacts;
export declare type OperationFacts = {
    documentAST: DocumentNode;
} & OperationASTFacts;
export declare type QueryFacts = OperationFacts;
export default function getOperationFacts(schema?: GraphQLSchema | null, documentString?: string | null): OperationFacts | undefined;
export declare const getQueryFacts: typeof getOperationFacts;
//# sourceMappingURL=getOperationFacts.d.ts.map