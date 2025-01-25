/// <reference types="react" />
import { WriteableEditorProps } from './types';
export declare type UseHeaderEditorArgs = WriteableEditorProps & {
    /**
     * Invoked when the contents of the headers editor change.
     * @param value The new contents of the editor.
     */
    onEdit?(value: string): void;
};
export declare function useHeaderEditor({ editorTheme, keyMap, onEdit, readOnly, }?: UseHeaderEditorArgs, caller?: Function): import("react").RefObject<HTMLDivElement>;
export declare const STORAGE_KEY = "headers";
