import type { JSONSchema6, JSONSchema6Definition, JSONSchema6TypeName } from 'json-schema';
import type { VariableToType } from './collectVariables';
export type { JSONSchema6, JSONSchema6TypeName };
export declare type JsonSchemaOptions = {
    useMarkdownDescription?: boolean;
};
export declare type JSONSchemaOptions = {
    useMarkdownDescription?: boolean;
    scalarSchemas?: Record<string, JSONSchema6>;
};
export declare const defaultJSONSchemaOptions: {
    useMarkdownDescription: boolean;
};
export declare type MonacoEditorJSONSchema = JSONSchema6 & {
    markdownDescription?: string;
};
export declare type CombinedSchema = JSONSchema6 | MonacoEditorJSONSchema;
declare type Definitions = {
    [k: string]: JSONSchema6Definition;
};
export declare type DefinitionResult = {
    definition: JSONSchema6 | MonacoEditorJSONSchema;
    required: boolean;
    definitions?: Definitions;
};
export declare function getVariablesJSONSchema(variableToType: VariableToType, options?: JSONSchemaOptions): JSONSchema6;
//# sourceMappingURL=getVariablesJSONSchema.d.ts.map