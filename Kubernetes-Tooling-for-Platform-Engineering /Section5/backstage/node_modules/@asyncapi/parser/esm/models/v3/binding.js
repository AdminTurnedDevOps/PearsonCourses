import { BaseModel } from '../base';
import { extensions } from './mixins';
export class Binding extends BaseModel {
    protocol() {
        return this._meta.protocol;
    }
    version() {
        return this._json.bindingVersion || 'latest';
    }
    value() {
        const value = Object.assign({}, this._json);
        delete value.bindingVersion;
        return value;
    }
    extensions() {
        return extensions(this);
    }
}
