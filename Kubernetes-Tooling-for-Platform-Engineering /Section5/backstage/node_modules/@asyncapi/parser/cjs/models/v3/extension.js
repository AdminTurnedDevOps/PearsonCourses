"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
const base_1 = require("../base");
class Extension extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    version() {
        return 'to implement';
    }
    value() {
        return this._json;
    }
}
exports.Extension = Extension;
