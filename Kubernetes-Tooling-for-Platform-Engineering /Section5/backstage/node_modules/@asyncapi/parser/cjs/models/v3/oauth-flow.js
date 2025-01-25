"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthFlow = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class OAuthFlow extends base_1.BaseModel {
    hasAuthorizationUrl() {
        return !!this.json().authorizationUrl;
    }
    authorizationUrl() {
        return this.json().authorizationUrl;
    }
    hasRefreshUrl() {
        return !!this._json.refreshUrl;
    }
    refreshUrl() {
        return this._json.refreshUrl;
    }
    scopes() {
        return this._json.availableScopes;
    }
    hasTokenUrl() {
        return !!this.json().tokenUrl;
    }
    tokenUrl() {
        return this.json().tokenUrl;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.OAuthFlow = OAuthFlow;
