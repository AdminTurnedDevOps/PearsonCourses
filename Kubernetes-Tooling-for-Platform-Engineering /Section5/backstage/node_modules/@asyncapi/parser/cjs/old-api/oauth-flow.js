"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthFlow = void 0;
const mixins_1 = require("./mixins");
class OAuthFlow extends mixins_1.SpecificationExtensionsModel {
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
exports.OAuthFlow = OAuthFlow;
