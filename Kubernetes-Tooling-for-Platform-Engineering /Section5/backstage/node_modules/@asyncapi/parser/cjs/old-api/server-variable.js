"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerVariable = void 0;
const mixins_1 = require("./mixins");
class ServerVariable extends mixins_1.SpecificationExtensionsModel {
    allowedValues() {
        return this._json.enum;
    }
    allows(name) {
        if (this._json.enum === undefined)
            return true;
        return this._json.enum.includes(name);
    }
    hasAllowedValues() {
        return this._json.enum !== undefined;
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    defaultValue() {
        return this._json.default;
    }
    hasDefaultValue() {
        return this._json.default !== undefined;
    }
    examples() {
        return this._json.examples;
    }
}
exports.ServerVariable = ServerVariable;
