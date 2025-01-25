"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CharacterStream {
    constructor(sourceText) {
        this._start = 0;
        this._pos = 0;
        this.getStartOfToken = () => this._start;
        this.getCurrentPosition = () => this._pos;
        this.eol = () => this._sourceText.length === this._pos;
        this.sol = () => this._pos === 0;
        this.peek = () => {
            return this._sourceText.charAt(this._pos) || null;
        };
        this.next = () => {
            const char = this._sourceText.charAt(this._pos);
            this._pos++;
            return char;
        };
        this.eat = (pattern) => {
            const isMatched = this._testNextCharacter(pattern);
            if (isMatched) {
                this._start = this._pos;
                this._pos++;
                return this._sourceText.charAt(this._pos - 1);
            }
            return undefined;
        };
        this.eatWhile = (match) => {
            let isMatched = this._testNextCharacter(match);
            let didEat = false;
            if (isMatched) {
                didEat = isMatched;
                this._start = this._pos;
            }
            while (isMatched) {
                this._pos++;
                isMatched = this._testNextCharacter(match);
                didEat = true;
            }
            return didEat;
        };
        this.eatSpace = () => this.eatWhile(/[\s\u00a0]/);
        this.skipToEnd = () => {
            this._pos = this._sourceText.length;
        };
        this.skipTo = (position) => {
            this._pos = position;
        };
        this.match = (pattern, consume = true, caseFold = false) => {
            let token = null;
            let match = null;
            if (typeof pattern === 'string') {
                const regex = new RegExp(pattern, caseFold ? 'i' : 'g');
                match = regex.test(this._sourceText.slice(this._pos, this._pos + pattern.length));
                token = pattern;
            }
            else if (pattern instanceof RegExp) {
                match = this._sourceText.slice(this._pos).match(pattern);
                token = match === null || match === void 0 ? void 0 : match[0];
            }
            if (match != null &&
                (typeof pattern === 'string' ||
                    (match instanceof Array &&
                        this._sourceText.startsWith(match[0], this._pos)))) {
                if (consume) {
                    this._start = this._pos;
                    if (token && token.length) {
                        this._pos += token.length;
                    }
                }
                return match;
            }
            return false;
        };
        this.backUp = (num) => {
            this._pos -= num;
        };
        this.column = () => this._pos;
        this.indentation = () => {
            const match = this._sourceText.match(/\s*/);
            let indent = 0;
            if (match && match.length !== 0) {
                const whiteSpaces = match[0];
                let pos = 0;
                while (whiteSpaces.length > pos) {
                    if (whiteSpaces.charCodeAt(pos) === 9) {
                        indent += 2;
                    }
                    else {
                        indent++;
                    }
                    pos++;
                }
            }
            return indent;
        };
        this.current = () => this._sourceText.slice(this._start, this._pos);
        this._sourceText = sourceText;
    }
    _testNextCharacter(pattern) {
        const character = this._sourceText.charAt(this._pos);
        let isMatched = false;
        if (typeof pattern === 'string') {
            isMatched = character === pattern;
        }
        else {
            isMatched =
                pattern instanceof RegExp
                    ? pattern.test(character)
                    : pattern(character);
        }
        return isMatched;
    }
}
exports.default = CharacterStream;
//# sourceMappingURL=CharacterStream.js.map