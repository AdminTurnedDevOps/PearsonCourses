import { Contact } from './contact';
import { License } from './license';
import { SpecificationExtensionsModel, description, hasDescription } from './mixins';
export class Info extends SpecificationExtensionsModel {
    title() {
        return this._json.title;
    }
    version() {
        return this._json.version;
    }
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    termsOfService() {
        return this._json.termsOfService;
    }
    license() {
        if (!this._json.license)
            return null;
        return new License(this._json.license);
    }
    contact() {
        if (!this._json.contact)
            return null;
        return new Contact(this._json.contact);
    }
}
