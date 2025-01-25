import { BaseModel } from '../base';
export class Extension extends BaseModel {
    id() {
        return this._meta.id;
    }
    value() {
        return this._json;
    }
}
