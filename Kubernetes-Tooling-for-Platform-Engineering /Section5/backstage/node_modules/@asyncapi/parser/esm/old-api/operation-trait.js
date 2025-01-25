import { SpecificationExtensionsModel, description, hasDescription, hasExternalDocs, externalDocs, tagsMixins, bindingsMixins } from './mixins';
import { SecurityRequirement } from './security-requirement';
export class OperationTrait extends SpecificationExtensionsModel {
    isPublish() {
        return this._meta.kind === 'publish';
    }
    isSubscribe() {
        return this._meta.kind === 'subscribe';
    }
    kind() {
        return this._meta.kind;
    }
    id() {
        return this._json.operationId;
    }
    summary() {
        return this._json.summary;
    }
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
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
    security() {
        if (!this._json.security)
            return null;
        return this._json.security.map(sec => new SecurityRequirement(sec));
    }
}
