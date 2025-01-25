"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printError = void 0;
const lodash_1 = require("lodash");
function printError(maybeError) {
    if ((0, lodash_1.isError)(maybeError)) {
        return maybeError.message;
    }
    return 'unknown error';
}
exports.printError = printError;
//# sourceMappingURL=printError.js.map