import { BaseModel } from '../base';
import { Contact } from './contact';
import { ExternalDocumentation } from './external-docs';
import { License } from './license';
import { Tags } from './tags';
import { Tag } from './tag';
import { hasDescription, description, extensions } from './mixins';
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
        return contact && this.createModel(Contact, contact, { pointer: '/info/contact' });
    }
    hasLicense() {
        return Object.keys(this._json.license || {}).length > 0;
    }
    license() {
        const license = this._json.license;
        return license && this.createModel(License, license, { pointer: '/info/license' });
    }
    hasExternalDocs() {
        const asyncapiV2 = this._meta.asyncapi.parsed;
        return Object.keys(asyncapiV2.externalDocs || {}).length > 0;
    }
    externalDocs() {
        if (this.hasExternalDocs()) {
            const asyncapiV2 = this._meta.asyncapi.parsed;
            return this.createModel(ExternalDocumentation, asyncapiV2.externalDocs, { pointer: '/externalDocs' });
        }
    }
    tags() {
        const asyncapiV2 = this._meta.asyncapi.parsed;
        const tags = asyncapiV2.tags || [];
        return new Tags(tags.map((tag, idx) => this.createModel(Tag, tag, { pointer: `/tags/${idx}` })));
    }
    extensions() {
        return extensions(this);
    }
}
