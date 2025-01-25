/// <reference types="react" />
import type { SchemaReference } from 'codemirror-graphql/utils/SchemaReference';
import type { DocumentNode } from 'graphql';
import { UseCopyQueryArgs } from './hooks';
import { WriteableEditorProps } from './types';
export declare type UseQueryEditorArgs = WriteableEditorProps & Pick<UseCopyQueryArgs, 'onCopyQuery'> & {
    /**
     * Invoked when a reference to the GraphQL schema (type or field) is clicked
     * as part of the editor or one of its tooltips.
     * @param reference The reference that has been clicked.
     */
    onClickReference?(reference: SchemaReference): void;
    /**
     * Invoked when the contents of the query editor change.
     * @param value The new contents of the editor.
     * @param documentAST The editor contents parsed into a GraphQL document.
     */
    onEdit?(value: string, documentAST?: DocumentNode): void;
};
export declare function useQueryEditor({ editorTheme, keyMap, onClickReference, onCopyQuery, onEdit, readOnly, }?: UseQueryEditorArgs, caller?: Function): import("react").RefObject<HTMLDivElement>;
export declare const STORAGE_KEY_QUERY = "query";
