import { SpecificationExtensionsModel, description, hasDescription, createMapOfType, bindingsMixins, tagsMixins, getMapValue } from './mixins';
import { ServerVariable } from './server-variable';
import { SecurityRequirement } from './security-requirement';
export class Server extends SpecificationExtensionsModel {
    url() {
        return this._json.url;
    }
    protocol() {
        return this._json.protocol;
    }
    protocolVersion() {
        return this._json.protocolVersion;
    }
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    variables() {
        return createMapOfType(this._json.variables, ServerVariable);
    }
    variable(name) {
        return getMapValue(this._json.variables, name, ServerVariable);
    }
    hasVariables() {
        return !!this._json.variables;
    }
    security() {
        if (!this._json.security)
            return null;
        return this._json.security.map(sec => new SecurityRequirement(sec));
    }
    hasBindings() {
        return bindingsMixins.hasBindings(this);
    }
    bindings() {
        return bindingsMixins.bindings(this);
    }
    bindingProtocols() {
        return bindingsMixins.bindingProtocols(this);
    }
    hasBinding(name) {
        return bindingsMixins.hasBinding(this, name);
    }
    binding(name) {
        return bindingsMixins.binding(this, name);
    }
    hasTags() {
        return tagsMixins.hasTags(this);
    }
    tags() {
        return tagsMixins.tags(this);
    }
    tagNames() {
        return tagsMixins.tagNames(this);
    }
    hasTag(name) {
        return tagsMixins.hasTag(this, name);
    }
    tag(name) {
        return tagsMixins.tag(this, name);
    }
}
