import { BaseModel } from '../base';
import { extensions } from './mixins';
export class Contact extends BaseModel {
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
        return extensions(this);
    }
}
