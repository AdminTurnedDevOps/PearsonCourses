"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthFlows = void 0;
const base_1 = require("../base");
const oauth_flow_1 = require("./oauth-flow");
const mixins_1 = require("./mixins");
class OAuthFlows extends base_1.BaseModel {
    hasAuthorizationCode() {
        return !!this._json.authorizationCode;
    }
    authorizationCode() {
        if (!this._json.authorizationCode)
            return undefined;
        return new oauth_flow_1.OAuthFlow(this._json.authorizationCode);
    }
    hasClientCredentials() {
        return !!this._json.clientCredentials;
    }
    clientCredentials() {
        if (!this._json.clientCredentials)
            return undefined;
        return new oauth_flow_1.OAuthFlow(this._json.clientCredentials);
    }
    hasImplicit() {
        return !!this._json.implicit;
    }
    implicit() {
        if (!this._json.implicit)
            return undefined;
        return new oauth_flow_1.OAuthFlow(this._json.implicit);
    }
    hasPassword() {
        return !!this._json.password;
    }
    password() {
        if (!this._json.password)
            return undefined;
        return new oauth_flow_1.OAuthFlow(this._json.password);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.OAuthFlows = OAuthFlows;
