import { BaseModel } from '../base';
export class SecurityRequirement extends BaseModel {
    scheme() {
        return this._json.scheme;
    }
    scopes() {
        return this._json.scopes || [];
    }
}
