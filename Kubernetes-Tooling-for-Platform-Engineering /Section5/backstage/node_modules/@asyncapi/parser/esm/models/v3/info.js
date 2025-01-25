import { BaseModel } from '../base';
import { Contact } from './contact';
import { License } from './license';
import { hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';
export class Info extends BaseModel {
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
        return hasDescription(this);
    }
    description() {
        return description(this);
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
        return contact && this.createModel(Contact, contact, { pointer: this.jsonPath('contact') });
    }
    hasLicense() {
        return Object.keys(this._json.license || {}).length > 0;
    }
    license() {
        const license = this._json.license;
        return license && this.createModel(License, license, { pointer: this.jsonPath('license') });
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
    tags() {
        return tags(this);
    }
    extensions() {
        return extensions(this);
    }
}
