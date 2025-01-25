"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityScheme = void 0;
const base_1 = require("../base");
const oauth_flows_1 = require("./oauth-flows");
const mixins_1 = require("./mixins");
class SecurityScheme extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    type() {
        return this._json.type;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    hasIn() {
        return !!this._json.in;
    }
    in() {
        return this._json.in;
    }
    hasScheme() {
        return !!this._json.scheme;
    }
    scheme() {
        return this._json.scheme;
    }
    hasBearerFormat() {
        return !!this._json.bearerFormat;
    }
    bearerFormat() {
        return this._json.bearerFormat;
    }
    hasFlows() {
        return !!this._json.flows;
    }
    flows() {
        if (!this._json.flows)
            return undefined;
        return new oauth_flows_1.OAuthFlows(this._json.flows);
    }
    hasOpenIdConnectUrl() {
        return !!this._json.openIdConnectUrl;
    }
    openIdConnectUrl() {
        return this._json.openIdConnectUrl;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.SecurityScheme = SecurityScheme;
