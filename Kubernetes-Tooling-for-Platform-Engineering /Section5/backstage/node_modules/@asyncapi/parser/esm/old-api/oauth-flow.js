import { SpecificationExtensionsModel } from './mixins';
export class OAuthFlow extends SpecificationExtensionsModel {
    authorizationUrl() {
        return this._json.authorizationUrl;
    }
    tokenUrl() {
        return this._json.tokenUrl;
    }
    refreshUrl() {
        return this._json.refreshUrl;
    }
    scopes() {
        return this._json.scopes;
    }
}
