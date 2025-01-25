"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedURI = void 0;
const BaseURI = require("urijs");
class ExtendedURI extends BaseURI {
    constructor(_value) {
        super(_value);
        this._value = _value.trim();
    }
    get length() {
        return this._value.length;
    }
}
exports.ExtendedURI = ExtendedURI;
//# sourceMappingURL=uri.js.map