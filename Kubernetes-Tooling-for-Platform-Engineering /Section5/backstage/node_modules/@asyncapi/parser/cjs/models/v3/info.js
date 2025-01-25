"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const base_1 = require("../base");
const contact_1 = require("./contact");
const license_1 = require("./license");
const mixins_1 = require("./mixins");
class Info extends base_1.BaseModel {
    title() {
        return this._json.title;
    }
    version() {
        return this._json.version;
    }
    hasId() {
        return !!this._meta.asyncapi.parsed.id;
    }
    id() {
        return this._meta.asyncapi.parsed.id;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasTermsOfService() {
        return !!this._json.termsOfService;
    }
    termsOfService() {
        return this._json.termsOfService;
    }
    hasContact() {
        return Object.keys(this._json.contact || {}).length > 0;
    }
    contact() {
        const contact = this._json.contact;
        return contact && this.createModel(contact_1.Contact, contact, { pointer: this.jsonPath('contact') });
    }
    hasLicense() {
        return Object.keys(this._json.license || {}).length > 0;
    }
    license() {
        const license = this._json.license;
        return license && this.createModel(license_1.License, license, { pointer: this.jsonPath('license') });
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    tags() {
        return (0, mixins_1.tags)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Info = Info;
