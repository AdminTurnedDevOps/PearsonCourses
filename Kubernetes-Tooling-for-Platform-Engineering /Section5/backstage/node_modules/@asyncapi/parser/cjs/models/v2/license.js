"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.License = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class License extends base_1.BaseModel {
    name() {
        return this._json.name;
    }
    hasUrl() {
        return !!this._json.url;
    }
    url() {
        return this._json.url;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.License = License;
