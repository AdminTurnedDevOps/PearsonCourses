import { TokenPattern, CharacterStreamInterface } from './types';
export default class CharacterStream implements CharacterStreamInterface {
    private _start;
    private _pos;
    private _sourceText;
    constructor(sourceText: string);
    getStartOfToken: () => number;
    getCurrentPosition: () => number;
    private _testNextCharacter;
    eol: () => boolean;
    sol: () => boolean;
    peek: () => string | null;
    next: () => string;
    eat: (pattern: TokenPattern) => string | undefined;
    eatWhile: (match: TokenPattern) => boolean;
    eatSpace: () => boolean;
    skipToEnd: () => void;
    skipTo: (position: number) => void;
    match: (pattern: TokenPattern, consume?: boolean | null | undefined, caseFold?: boolean | null | undefined) => Array<string> | boolean;
    backUp: (num: number) => void;
    column: () => number;
    indentation: () => number;
    current: () => string;
}
//# sourceMappingURL=CharacterStream.d.ts.map