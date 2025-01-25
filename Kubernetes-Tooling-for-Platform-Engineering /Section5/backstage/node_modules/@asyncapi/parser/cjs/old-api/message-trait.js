"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTrait = void 0;
const mixins_1 = require("./mixins");
const correlation_id_1 = require("./correlation-id");
const schema_1 = require("./schema");
class MessageTrait extends mixins_1.SpecificationExtensionsModel {
    id() {
        return this._json.messageId;
    }
    headers() {
        if (!this._json.headers)
            return null;
        return new schema_1.Schema(this._json.headers);
    }
    header(name) {
        if (!this._json.headers)
            return null;
        return (0, mixins_1.getMapValue)(this._json.headers.properties || {}, name, schema_1.Schema);
    }
    correlationId() {
        if (!this._json.correlationId)
            return null;
        return new correlation_id_1.CorrelationId(this._json.correlationId);
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
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    hasTags() {
        return mixins_1.tagsMixins.hasTags(this);
    }
    tags() {
        return mixins_1.tagsMixins.tags(this);
    }
    tagNames() {
        return mixins_1.tagsMixins.tagNames(this);
    }
    hasTag(name) {
        return mixins_1.tagsMixins.hasTag(this, name);
    }
    tag(name) {
        return mixins_1.tagsMixins.tag(this, name);
    }
    hasBindings() {
        return mixins_1.bindingsMixins.hasBindings(this);
    }
    bindings() {
        return mixins_1.bindingsMixins.bindings(this);
    }
    bindingProtocols() {
        return mixins_1.bindingsMixins.bindingProtocols(this);
    }
    hasBinding(name) {
        return mixins_1.bindingsMixins.hasBinding(this, name);
    }
    binding(name) {
        return mixins_1.bindingsMixins.binding(this, name);
    }
    examples() {
        return this._json.examples;
    }
}
exports.MessageTrait = MessageTrait;
