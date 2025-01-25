"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const mixins_1 = require("./mixins");
const server_variable_1 = require("./server-variable");
const security_requirement_1 = require("./security-requirement");
class Server extends mixins_1.SpecificationExtensionsModel {
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
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    variables() {
        return (0, mixins_1.createMapOfType)(this._json.variables, server_variable_1.ServerVariable);
    }
    variable(name) {
        return (0, mixins_1.getMapValue)(this._json.variables, name, server_variable_1.ServerVariable);
    }
    hasVariables() {
        return !!this._json.variables;
    }
    security() {
        if (!this._json.security)
            return null;
        return this._json.security.map(sec => new security_requirement_1.SecurityRequirement(sec));
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
}
exports.Server = Server;
