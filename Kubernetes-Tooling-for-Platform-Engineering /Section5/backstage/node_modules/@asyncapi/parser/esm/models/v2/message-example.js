import { BaseModel } from '../base';
import { extensions } from './mixins';
export class MessageExample extends BaseModel {
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    hasSummary() {
        return !!this._json.summary;
    }
    summary() {
        return this._json.summary;
    }
    hasHeaders() {
        return !!this._json.headers;
    }
    headers() {
        return this._json.headers;
    }
    hasPayload() {
        return !!this._json.payload;
    }
    payload() {
        return this._json.payload;
    }
    extensions() {
        return extensions(this);
    }
}
