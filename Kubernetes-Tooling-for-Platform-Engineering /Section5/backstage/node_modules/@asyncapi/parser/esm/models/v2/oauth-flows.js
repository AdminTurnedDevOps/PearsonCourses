import { BaseModel } from '../base';
import { OAuthFlow } from './oauth-flow';
import { extensions } from './mixins';
export class OAuthFlows extends BaseModel {
    hasAuthorizationCode() {
        return !!this._json.authorizationCode;
    }
    authorizationCode() {
        if (!this._json.authorizationCode)
            return undefined;
        return new OAuthFlow(this._json.authorizationCode);
    }
    hasClientCredentials() {
        return !!this._json.clientCredentials;
    }
    clientCredentials() {
        if (!this._json.clientCredentials)
            return undefined;
        return new OAuthFlow(this._json.clientCredentials);
    }
    hasImplicit() {
        return !!this._json.implicit;
    }
    implicit() {
        if (!this._json.implicit)
            return undefined;
        return new OAuthFlow(this._json.implicit);
    }
    hasPassword() {
        return !!this._json.password;
    }
    password() {
        if (!this._json.password)
            return undefined;
        return new OAuthFlow(this._json.password);
    }
    extensions() {
        return extensions(this);
    }
}
