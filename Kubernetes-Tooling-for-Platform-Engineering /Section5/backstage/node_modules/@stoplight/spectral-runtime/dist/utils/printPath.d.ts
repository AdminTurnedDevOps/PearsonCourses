import type { JsonPath } from '@stoplight/types';
export declare enum PrintStyle {
    Dot = "dot",
    Pointer = "pointer",
    EscapedPointer = "escapedPointer"
}
export declare const printPath: (path: JsonPath, style: PrintStyle) => string;
