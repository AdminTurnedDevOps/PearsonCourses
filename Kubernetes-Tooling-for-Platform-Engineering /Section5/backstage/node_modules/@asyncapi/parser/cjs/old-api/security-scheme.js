"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityScheme = void 0;
const mixins_1 = require("./mixins");
const oauth_flow_1 = require("./oauth-flow");
class SecurityScheme extends mixins_1.SpecificationExtensionsModel {
    type() {
        return this._json.type;
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    name() {
        return this._json.name;
    }
    in() {
        return this._json.in;
    }
    scheme() {
        return this._json.scheme;
    }
    bearerFormat() {
        return this._json.bearerFormat;
    }
    openIdConnectUrl() {
        return this._json.openIdConnectUrl;
    }
    flows() {
        return (0, mixins_1.createMapOfType)(this._json.flows, oauth_flow_1.OAuthFlow);
    }
}
exports.SecurityScheme = SecurityScheme;
