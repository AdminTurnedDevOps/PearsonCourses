"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binding = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class Binding extends base_1.BaseModel {
    protocol() {
        return this._meta.protocol;
    }
    version() {
        return this._json.bindingVersion || 'latest';
    }
    value() {
        const value = Object.assign({}, this._json);
        delete value.bindingVersion;
        return value;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Binding = Binding;
