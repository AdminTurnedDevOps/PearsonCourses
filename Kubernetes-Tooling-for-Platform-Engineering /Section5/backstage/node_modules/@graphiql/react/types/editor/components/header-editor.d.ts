import { UseHeaderEditorArgs } from '../header-editor';
import '../style/codemirror.css';
import '../style/fold.css';
import '../style/editor.css';
declare type HeaderEditorProps = UseHeaderEditorArgs & {
    /**
     * Visually hide the header editor.
     * @default false
     */
    isHidden?: boolean;
};
export declare function HeaderEditor({ isHidden, ...hookArgs }: HeaderEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
