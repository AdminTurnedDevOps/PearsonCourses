"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationTrait = void 0;
const mixins_1 = require("./mixins");
const security_requirement_1 = require("./security-requirement");
class OperationTrait extends mixins_1.SpecificationExtensionsModel {
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
    security() {
        if (!this._json.security)
            return null;
        return this._json.security.map(sec => new security_requirement_1.SecurityRequirement(sec));
    }
}
exports.OperationTrait = OperationTrait;
