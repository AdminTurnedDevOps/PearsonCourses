"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const mixins_1 = require("./mixins");
const channel_parameter_1 = require("./channel-parameter");
const operation_1 = require("./operation");
class Channel extends mixins_1.SpecificationExtensionsModel {
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    hasParameters() {
        return !!this._json.parameters;
    }
    parameters() {
        return (0, mixins_1.createMapOfType)(this._json.parameters, channel_parameter_1.ChannelParameter);
    }
    parameter(name) {
        return (0, mixins_1.getMapValue)(this._json.parameters, name, channel_parameter_1.ChannelParameter);
    }
    hasServers() {
        return !!this._json.servers;
    }
    servers() {
        if (!this._json.servers)
            return [];
        return this._json.servers;
    }
    server(index) {
        if (!this._json.servers)
            return null;
        if (typeof index !== 'number')
            return null;
        if (index > this._json.servers.length - 1)
            return null;
        return this._json.servers[+index];
    }
    publish() {
        if (!this._json.publish)
            return null;
        return new operation_1.Operation(this._json.publish, { kind: 'publish' });
    }
    subscribe() {
        if (!this._json.subscribe)
            return null;
        return new operation_1.Operation(this._json.subscribe, { kind: 'subscribe' });
    }
    hasPublish() {
        return !!this._json.publish;
    }
    hasSubscribe() {
        return !!this._json.subscribe;
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
}
exports.Channel = Channel;
