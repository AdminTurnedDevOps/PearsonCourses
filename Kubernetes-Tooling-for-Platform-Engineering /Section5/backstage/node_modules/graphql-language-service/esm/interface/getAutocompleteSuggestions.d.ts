import { FragmentDefinitionNode, GraphQLDirective, GraphQLSchema } from 'graphql';
import { CompletionItem, IPosition } from '../types';
import type { ContextToken, State, ContextTokenForCodeMirror } from '../parser';
import { getTypeInfo, runOnlineParser, GraphQLDocumentMode } from '../parser';
export { runOnlineParser, getTypeInfo };
export declare const SuggestionCommand: {
    command: string;
    title: string;
};
export declare type AutocompleteSuggestionOptions = {
    fillLeafsOnComplete?: boolean;
    uri?: string;
    mode?: GraphQLDocumentMode;
};
export declare function getAutocompleteSuggestions(schema: GraphQLSchema, queryText: string, cursor: IPosition, contextToken?: ContextTokenForCodeMirror, fragmentDefs?: FragmentDefinitionNode[] | string, options?: AutocompleteSuggestionOptions): Array<CompletionItem>;
export declare function getVariableCompletions(queryText: string, schema: GraphQLSchema, token: ContextToken): CompletionItem[];
export declare function getFragmentDefinitions(queryText: string): Array<FragmentDefinitionNode>;
export declare function canUseDirective(state: State['prevState'], directive: GraphQLDirective): boolean;
//# sourceMappingURL=getAutocompleteSuggestions.d.ts.map