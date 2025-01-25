import { SpecificationExtensionsModel, description, hasDescription, hasExternalDocs, externalDocs, tagsMixins, bindingsMixins, getMapValue } from './mixins';
import { CorrelationId } from './correlation-id';
import { Schema } from './schema';
export class MessageTrait extends SpecificationExtensionsModel {
    id() {
        return this._json.messageId;
    }
    headers() {
        if (!this._json.headers)
            return null;
        return new Schema(this._json.headers);
    }
    header(name) {
        if (!this._json.headers)
            return null;
        return getMapValue(this._json.headers.properties || {}, name, Schema);
    }
    correlationId() {
        if (!this._json.correlationId)
            return null;
        return new CorrelationId(this._json.correlationId);
    }
    schemaFormat() {
        return this._json.schemaFormat; // Old API points always to the default schema format for given AsyncAPI version, so we need to force returned type as string.
    }
    contentType() {
        return this._json.contentType;
    }
    name() {
        return this._json.name;
    }
    title() {
        return this._json.title;
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
    examples() {
        return this._json.examples;
    }
}
