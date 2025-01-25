"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.License = void 0;
const mixins_1 = require("./mixins");
class License extends mixins_1.SpecificationExtensionsModel {
    name() {
        return this._json.name;
    }
    url() {
        return this._json.url;
    }
}
exports.License = License;
