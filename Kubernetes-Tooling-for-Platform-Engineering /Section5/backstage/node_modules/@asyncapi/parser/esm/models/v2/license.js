import { BaseModel } from '../base';
import { extensions } from './mixins';
export class License extends BaseModel {
    name() {
        return this._json.name;
    }
    hasUrl() {
        return !!this._json.url;
    }
    url() {
        return this._json.url;
    }
    extensions() {
        return extensions(this);
    }
}
