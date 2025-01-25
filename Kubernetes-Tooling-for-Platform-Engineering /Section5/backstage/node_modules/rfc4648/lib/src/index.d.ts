export interface Encoding {
    bits: number;
    chars: string;
    codes?: {
        [char: string]: number;
    };
}
export interface ParseOptions {
    loose?: boolean;
    out?: new (size: number) => {
        [index: number]: number;
    };
}
export interface StringifyOptions {
    pad?: boolean;
}
export declare const base16: {
    parse(string: string, opts?: ParseOptions | undefined): Uint8Array;
    stringify(data: ArrayLike<number>, opts?: StringifyOptions | undefined): string;
};
export declare const base32: {
    parse(string: string, opts?: ParseOptions): Uint8Array;
    stringify(data: ArrayLike<number>, opts?: StringifyOptions | undefined): string;
};
export declare const base32hex: {
    parse(string: string, opts?: ParseOptions | undefined): Uint8Array;
    stringify(data: ArrayLike<number>, opts?: StringifyOptions | undefined): string;
};
export declare const base64: {
    parse(string: string, opts?: ParseOptions | undefined): Uint8Array;
    stringify(data: ArrayLike<number>, opts?: StringifyOptions | undefined): string;
};
export declare const base64url: {
    parse(string: string, opts?: ParseOptions | undefined): Uint8Array;
    stringify(data: ArrayLike<number>, opts?: StringifyOptions | undefined): string;
};
export declare const codec: {
    parse: typeof parse;
    stringify: typeof stringify;
};
declare function parse(string: string, encoding: Encoding, opts?: ParseOptions): Uint8Array;
declare function stringify(data: ArrayLike<number>, encoding: Encoding, opts?: StringifyOptions): string;
export {};
