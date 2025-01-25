import { BaseModel } from '../base';
import { OAuthFlows } from './oauth-flows';
import { hasDescription, description, extensions } from './mixins';
export class SecurityScheme extends BaseModel {
    id() {
        return this._meta.id;
    }
    type() {
        return this._json.type;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
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
        return new OAuthFlows(this._json.flows);
    }
    hasOpenIdConnectUrl() {
        return !!this._json.openIdConnectUrl;
    }
    openIdConnectUrl() {
        return this._json.openIdConnectUrl;
    }
    extensions() {
        return extensions(this);
    }
}
