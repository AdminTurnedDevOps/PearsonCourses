import { GraphQLSchema, DocumentNode, GraphQLInputType } from 'graphql';
export declare type VariableToType = {
    [variable: string]: GraphQLInputType;
};
export declare function collectVariables(schema: GraphQLSchema, documentAST: DocumentNode): VariableToType;
//# sourceMappingURL=collectVariables.d.ts.map