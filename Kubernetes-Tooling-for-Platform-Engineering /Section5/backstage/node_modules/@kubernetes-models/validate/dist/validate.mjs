import ValidationError from "./runtime/validation_error.mjs";
import localize from "ajv-i18n";
function generateErrorMessage(errors) {
    localize.en(errors);
    return errors
        .map((err) => `data${err.instancePath} ${err.message}`)
        .join(", ");
}
export function runValidateFunc(fn, data) {
    if (!fn(data) && fn.errors) {
        const errors = fn.errors;
        const err = new ValidationError(errors);
        err.message = generateErrorMessage(errors);
        throw err;
    }
}
//# sourceMappingURL=validate.mjs.map