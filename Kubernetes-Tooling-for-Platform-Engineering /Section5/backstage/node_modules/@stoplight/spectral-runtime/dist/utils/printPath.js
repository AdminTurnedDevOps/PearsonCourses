"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printPath = exports.PrintStyle = void 0;
const json_1 = require("@stoplight/json");
var PrintStyle;
(function (PrintStyle) {
    PrintStyle["Dot"] = "dot";
    PrintStyle["Pointer"] = "pointer";
    PrintStyle["EscapedPointer"] = "escapedPointer";
})(PrintStyle = exports.PrintStyle || (exports.PrintStyle = {}));
const isNumeric = (input) => typeof input === 'number' || !Number.isNaN(Number(input));
const hasWhitespace = (input) => /\s/.test(input);
const safeDecodePointerFragment = (segment) => typeof segment === 'number' ? segment : (0, json_1.decodePointerFragment)(segment);
const printDotBracketsSegment = (segment) => {
    if (typeof segment === 'number') {
        return `[${segment}]`;
    }
    if (segment.length === 0) {
        return `['']`;
    }
    if (hasWhitespace(segment)) {
        return `['${segment}']`;
    }
    if (isNumeric(segment)) {
        return `[${segment}]`;
    }
    return null;
};
const pathToDotString = (path) => path.reduce((output, segment, index) => { var _a; return `${output}${(_a = printDotBracketsSegment(segment)) !== null && _a !== void 0 ? _a : `${index === 0 ? '' : '.'}${segment}`}`; }, '');
const printPath = (path, style) => {
    switch (style) {
        case PrintStyle.Dot:
            return (0, json_1.decodePointerFragment)(pathToDotString(path));
        case PrintStyle.Pointer:
            if (path.length === 0) {
                return '#';
            }
            return `#/${(0, json_1.decodePointerFragment)(path.join('/'))}`;
        case PrintStyle.EscapedPointer:
            return (0, json_1.pathToPointer)(path.map(safeDecodePointerFragment));
        default:
            return String(path);
    }
};
exports.printPath = printPath;
//# sourceMappingURL=printPath.js.map