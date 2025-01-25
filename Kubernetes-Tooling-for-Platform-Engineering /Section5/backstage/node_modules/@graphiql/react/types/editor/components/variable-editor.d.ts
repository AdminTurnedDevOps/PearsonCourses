import { UseVariableEditorArgs } from '../variable-editor';
import '../style/codemirror.css';
import '../style/fold.css';
import '../style/lint.css';
import '../style/hint.css';
import '../style/editor.css';
declare type VariableEditorProps = UseVariableEditorArgs & {
    /**
     * Visually hide the header editor.
     * @default false
     */
    isHidden?: boolean;
};
export declare function VariableEditor({ isHidden, ...hookArgs }: VariableEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
