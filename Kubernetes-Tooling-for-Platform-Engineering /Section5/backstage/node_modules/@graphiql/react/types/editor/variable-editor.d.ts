/// <reference types="react" />
import type { SchemaReference } from 'codemirror-graphql/utils/SchemaReference';
import { WriteableEditorProps } from './types';
export declare type UseVariableEditorArgs = WriteableEditorProps & {
    /**
     * Invoked when a reference to the GraphQL schema (type or field) is clicked
     * as part of the editor or one of its tooltips.
     * @param reference The reference that has been clicked.
     */
    onClickReference?(reference: SchemaReference): void;
    /**
     * Invoked when the contents of the variables editor change.
     * @param value The new contents of the editor.
     */
    onEdit?(value: string): void;
};
export declare function useVariableEditor({ editorTheme, keyMap, onClickReference, onEdit, readOnly, }?: UseVariableEditorArgs, caller?: Function): import("react").RefObject<HTMLDivElement>;
export declare const STORAGE_KEY = "variables";
