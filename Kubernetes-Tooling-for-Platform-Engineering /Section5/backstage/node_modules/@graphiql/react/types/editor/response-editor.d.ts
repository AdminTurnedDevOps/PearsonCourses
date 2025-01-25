import type { Position, Token } from 'codemirror';
import { ComponentType } from 'react';
import { CommonEditorProps } from './types';
export declare type ResponseTooltipType = ComponentType<{
    /**
     * The position of the token in the editor contents.
     */
    pos: Position;
    /**
     * The token that has been hovered over.
     */
    token: Token;
}>;
export declare type UseResponseEditorArgs = CommonEditorProps & {
    /**
     * Customize the tooltip when hovering over properties in the response
     * editor.
     */
    responseTooltip?: ResponseTooltipType;
};
export declare function useResponseEditor({ responseTooltip, editorTheme, keyMap, }?: UseResponseEditorArgs, caller?: Function): import("react").RefObject<HTMLDivElement>;
