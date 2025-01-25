"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locToRange = exports.offsetToPosition = exports.Position = exports.Range = void 0;
class Range {
    constructor(start, end) {
        this.containsPosition = (position) => {
            if (this.start.line === position.line) {
                return this.start.character <= position.character;
            }
            if (this.end.line === position.line) {
                return this.end.character >= position.character;
            }
            return this.start.line <= position.line && this.end.line >= position.line;
        };
        this.start = start;
        this.end = end;
    }
    setStart(line, character) {
        this.start = new Position(line, character);
    }
    setEnd(line, character) {
        this.end = new Position(line, character);
    }
}
exports.Range = Range;
class Position {
    constructor(line, character) {
        this.lessThanOrEqualTo = (position) => this.line < position.line ||
            (this.line === position.line && this.character <= position.character);
        this.line = line;
        this.character = character;
    }
    setLine(line) {
        this.line = line;
    }
    setCharacter(character) {
        this.character = character;
    }
}
exports.Position = Position;
function offsetToPosition(text, loc) {
    const EOL = '\n';
    const buf = text.slice(0, loc);
    const lines = buf.split(EOL).length - 1;
    const lastLineIndex = buf.lastIndexOf(EOL);
    return new Position(lines, loc - lastLineIndex - 1);
}
exports.offsetToPosition = offsetToPosition;
function locToRange(text, loc) {
    const start = offsetToPosition(text, loc.start);
    const end = offsetToPosition(text, loc.end);
    return new Range(start, end);
}
exports.locToRange = locToRange;
//# sourceMappingURL=Range.js.map