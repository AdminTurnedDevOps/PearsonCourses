import type { Editor, EditorChange } from 'codemirror';
import { GraphQLNamedType, GraphQLSchema } from 'graphql';
import { ExplorerContextType } from '../explorer';
import { PluginContextType } from '../plugin';
/**
 * Render a custom UI for CodeMirror's hint which includes additional info
 * about the type and description for the selected context.
 */
export declare function onHasCompletion(_cm: Editor, data: EditorChange | undefined, schema: GraphQLSchema | null | undefined, explorer: ExplorerContextType | null, plugin: PluginContextType | null, callback?: (type: GraphQLNamedType) => void): void;
