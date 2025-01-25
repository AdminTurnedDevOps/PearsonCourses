/// <reference types="codemirror" />
import { KeyMap } from './types';
export declare const DEFAULT_EDITOR_THEME = "graphiql";
export declare const DEFAULT_KEY_MAP: KeyMap;
export declare const commonKeys: {
    [x: string]: string;
    'Cmd-G': string;
    'Ctrl-G': string;
    'Ctrl-Left': string;
    'Ctrl-Right': string;
    'Alt-Left': string;
    'Alt-Right': string;
};
/**
 * Dynamically import codemirror and dependencies
 * This works for codemirror 5, not sure if the same imports work for 6
 */
export declare function importCodeMirror(addons: Promise<any>[], options?: {
    useCommonAddons?: boolean;
}): Promise<typeof import("codemirror")>;
