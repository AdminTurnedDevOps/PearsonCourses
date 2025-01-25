import { DocumentNode, FragmentDefinitionNode } from 'graphql';
export declare const getFragmentDependencies: (operationString: string, fragmentDefinitions?: Map<string, FragmentDefinitionNode> | null) => FragmentDefinitionNode[];
export declare const getFragmentDependenciesForAST: (parsedOperation: DocumentNode, fragmentDefinitions: Map<string, FragmentDefinitionNode>) => FragmentDefinitionNode[];
//# sourceMappingURL=fragmentDependencies.d.ts.map