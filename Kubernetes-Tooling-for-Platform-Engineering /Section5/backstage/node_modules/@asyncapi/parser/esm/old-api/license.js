import { SpecificationExtensionsModel } from './mixins';
export class License extends SpecificationExtensionsModel {
    name() {
        return this._json.name;
    }
    url() {
        return this._json.url;
    }
}
