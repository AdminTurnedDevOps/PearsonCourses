"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const base_1 = require("../base");
const contact_1 = require("./contact");
const external_docs_1 = require("./external-docs");
const license_1 = require("./license");
const tags_1 = require("./tags");
const tag_1 = require("./tag");
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
        return contact && this.createModel(contact_1.Contact, contact, { pointer: '/info/contact' });
    }
    hasLicense() {
        return Object.keys(this._json.license || {}).length > 0;
    }
    license() {
        const license = this._json.license;
        return license && this.createModel(license_1.License, license, { pointer: '/info/license' });
    }
    hasExternalDocs() {
        const asyncapiV2 = this._meta.asyncapi.parsed;
        return Object.keys(asyncapiV2.externalDocs || {}).length > 0;
    }
    externalDocs() {
        if (this.hasExternalDocs()) {
            const asyncapiV2 = this._meta.asyncapi.parsed;
            return this.createModel(external_docs_1.ExternalDocumentation, asyncapiV2.externalDocs, { pointer: '/externalDocs' });
        }
    }
    tags() {
        const asyncapiV2 = this._meta.asyncapi.parsed;
        const tags = asyncapiV2.tags || [];
        return new tags_1.Tags(tags.map((tag, idx) => this.createModel(tag_1.Tag, tag, { pointer: `/tags/${idx}` })));
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Info = Info;
