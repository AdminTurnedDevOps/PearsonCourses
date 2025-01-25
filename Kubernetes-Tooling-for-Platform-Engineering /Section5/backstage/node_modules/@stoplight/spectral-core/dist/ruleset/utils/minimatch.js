"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minimatch = void 0;
const tslib_1 = require("tslib");
const minimatch_1 = (0, tslib_1.__importDefault)(require("minimatch"));
const DEFAULT_OPTS = { matchBase: true };
function minimatch(source, pattern) {
    return (0, minimatch_1.default)(source, pattern, DEFAULT_OPTS);
}
exports.minimatch = minimatch;
//# sourceMappingURL=minimatch.js.map