"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidateFunc = void 0;
const tslib_1 = require("tslib");
const validation_error_1 = tslib_1.__importDefault(require("./runtime/validation_error.js"));
const ajv_i18n_1 = tslib_1.__importDefault(require("ajv-i18n"));
function generateErrorMessage(errors) {
    ajv_i18n_1.default.en(errors);
    return errors
        .map((err) => `data${err.instancePath} ${err.message}`)
        .join(", ");
}
function runValidateFunc(fn, data) {
    if (!fn(data) && fn.errors) {
        const errors = fn.errors;
        const err = new validation_error_1.default(errors);
        err.message = generateErrorMessage(errors);
        throw err;
    }
}
exports.runValidateFunc = runValidateFunc;
//# sourceMappingURL=validate.js.map