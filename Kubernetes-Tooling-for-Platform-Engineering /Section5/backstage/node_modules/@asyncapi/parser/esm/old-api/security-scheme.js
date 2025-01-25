import { SpecificationExtensionsModel, description, hasDescription, createMapOfType } from './mixins';
import { OAuthFlow } from './oauth-flow';
export class SecurityScheme extends SpecificationExtensionsModel {
    type() {
        return this._json.type;
    }
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
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
        return createMapOfType(this._json.flows, OAuthFlow);
    }
}
