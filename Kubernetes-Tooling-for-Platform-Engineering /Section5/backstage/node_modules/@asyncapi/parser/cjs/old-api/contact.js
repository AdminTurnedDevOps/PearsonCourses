"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mixins_1 = require("./mixins");
class Contact extends mixins_1.SpecificationExtensionsModel {
    name() {
        return this._json.name;
    }
    url() {
        return this._json.url;
    }
    email() {
        return this._json.email;
    }
}
exports.Contact = Contact;
