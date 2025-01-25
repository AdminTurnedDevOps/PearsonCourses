"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formats = void 0;
function printFormat(format) {
    var _a;
    return (_a = format.displayName) !== null && _a !== void 0 ? _a : format.name;
}
class Formats extends Set {
    toJSON() {
        return Array.from(this).map(printFormat);
    }
}
exports.Formats = Formats;
//# sourceMappingURL=formats.js.map