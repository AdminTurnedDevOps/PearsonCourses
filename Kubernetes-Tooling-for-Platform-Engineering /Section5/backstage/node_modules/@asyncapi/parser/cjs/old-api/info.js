"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const contact_1 = require("./contact");
const license_1 = require("./license");
const mixins_1 = require("./mixins");
class Info extends mixins_1.SpecificationExtensionsModel {
    title() {
        return this._json.title;
    }
    version() {
        return this._json.version;
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    termsOfService() {
        return this._json.termsOfService;
    }
    license() {
        if (!this._json.license)
            return null;
        return new license_1.License(this._json.license);
    }
    contact() {
        if (!this._json.contact)
            return null;
        return new contact_1.Contact(this._json.contact);
    }
}
exports.Info = Info;
