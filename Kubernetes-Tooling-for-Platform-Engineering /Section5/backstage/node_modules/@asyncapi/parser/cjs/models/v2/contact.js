"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class Contact extends base_1.BaseModel {
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    hasUrl() {
        return !!this._json.url;
    }
    url() {
        return this._json.url;
    }
    hasEmail() {
        return !!this._json.email;
    }
    email() {
        return this._json.email;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Contact = Contact;
