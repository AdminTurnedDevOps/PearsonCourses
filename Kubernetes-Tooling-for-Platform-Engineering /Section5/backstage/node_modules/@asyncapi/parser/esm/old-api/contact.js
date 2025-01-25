import { SpecificationExtensionsModel } from './mixins';
export class Contact extends SpecificationExtensionsModel {
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
