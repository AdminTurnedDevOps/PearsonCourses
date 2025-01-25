import { BaseModel } from '../base';
export class Extension extends BaseModel {
    id() {
        return this._meta.id;
    }
    version() {
        return 'to implement';
    }
    value() {
        return this._json;
    }
}
