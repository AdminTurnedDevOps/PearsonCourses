import { BaseModel } from '../base';
import { extensions } from './mixins';
export class OAuthFlow extends BaseModel {
    hasAuthorizationUrl() {
        return !!this.json().authorizationUrl;
    }
    authorizationUrl() {
        return this.json().authorizationUrl;
    }
    hasTokenUrl() {
        return !!this.json().tokenUrl;
    }
    tokenUrl() {
        return this.json().tokenUrl;
    }
    hasRefreshUrl() {
        return !!this._json.refreshUrl;
    }
    refreshUrl() {
        return this._json.refreshUrl;
    }
    scopes() {
        return this._json.scopes;
    }
    extensions() {
        return extensions(this);
    }
}
