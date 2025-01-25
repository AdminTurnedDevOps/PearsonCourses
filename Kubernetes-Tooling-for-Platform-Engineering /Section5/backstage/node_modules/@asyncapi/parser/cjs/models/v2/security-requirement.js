"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRequirement = void 0;
const base_1 = require("../base");
class SecurityRequirement extends base_1.BaseModel {
    scheme() {
        return this._json.scheme;
    }
    scopes() {
        return this._json.scopes || [];
    }
}
exports.SecurityRequirement = SecurityRequirement;
