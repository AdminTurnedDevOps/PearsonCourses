"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValidateFunc = exports.Model = void 0;
const is_plain_object_1 = require("is-plain-object");
const validate_1 = require("@kubernetes-models/validate");
function setDefinedProps(src, dst) {
    for (const key of Object.keys(src)) {
        if (src[key] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            dst[key] = filterUndefinedValues(src[key]);
        }
    }
    return dst;
}
function filterUndefinedValues(data) {
    if (Array.isArray(data)) {
        return data.map(filterUndefinedValues);
    }
    if ((0, is_plain_object_1.isPlainObject)(data)) {
        return setDefinedProps(data, {});
    }
    return data;
}
class Model {
    constructor(data) {
        if (data) {
            setDefinedProps(data, this);
        }
    }
    setDefinedProps(data) {
        if (data) {
            setDefinedProps(data, this);
        }
    }
    toJSON() {
        const result = {};
        setDefinedProps(this, result);
        return result;
    }
    validate() {
        // Use `setValidateFunc` to set the validate function
    }
}
exports.Model = Model;
function setValidateFunc(ctor, fn) {
    ctor.prototype.validate = function () {
        (0, validate_1.runValidateFunc)(fn, this);
    };
}
exports.setValidateFunc = setValidateFunc;
//# sourceMappingURL=model.js.map