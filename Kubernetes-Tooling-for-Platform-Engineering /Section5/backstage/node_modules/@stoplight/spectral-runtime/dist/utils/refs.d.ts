import type { Dictionary, JsonPath } from '@stoplight/types';
export declare const startsWithProtocol: (input: string) => boolean;
export declare const isAbsoluteRef: (ref: string) => boolean;
export declare const traverseObjUntilRef: (obj: unknown, path: JsonPath) => string | null;
export declare const getEndRef: (refMap: Dictionary<string>, $ref: string) => string;
export declare const safePointerToPath: (pointer: string) => JsonPath;
export declare const getClosestJsonPath: (data: unknown, path: JsonPath) => JsonPath;
