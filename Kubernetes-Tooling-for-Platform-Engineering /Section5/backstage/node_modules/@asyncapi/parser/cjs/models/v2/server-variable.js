"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerVariable = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class ServerVariable extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDefaultValue() {
        return !!this._json.default;
    }
    defaultValue() {
        return this._json.default;
    }
    hasAllowedValues() {
        return !!this._json.enum;
    }
    allowedValues() {
        return this._json.enum || [];
    }
    examples() {
        return this._json.examples || [];
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.ServerVariable = ServerVariable;
