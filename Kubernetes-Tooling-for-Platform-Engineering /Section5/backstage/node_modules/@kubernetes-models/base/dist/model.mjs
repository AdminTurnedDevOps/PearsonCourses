import { isPlainObject } from "is-plain-object";
import { runValidateFunc } from "@kubernetes-models/validate";
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
    if (isPlainObject(data)) {
        return setDefinedProps(data, {});
    }
    return data;
}
export class Model {
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
export function setValidateFunc(ctor, fn) {
    ctor.prototype.validate = function () {
        runValidateFunc(fn, this);
    };
}
//# sourceMappingURL=model.mjs.map