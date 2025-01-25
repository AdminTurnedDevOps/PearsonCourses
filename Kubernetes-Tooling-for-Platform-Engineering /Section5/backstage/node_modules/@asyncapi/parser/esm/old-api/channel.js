import { SpecificationExtensionsModel, hasDescription, description, createMapOfType, bindingsMixins, getMapValue } from './mixins';
import { ChannelParameter } from './channel-parameter';
import { Operation } from './operation';
export class Channel extends SpecificationExtensionsModel {
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    hasParameters() {
        return !!this._json.parameters;
    }
    parameters() {
        return createMapOfType(this._json.parameters, ChannelParameter);
    }
    parameter(name) {
        return getMapValue(this._json.parameters, name, ChannelParameter);
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
        return new Operation(this._json.publish, { kind: 'publish' });
    }
    subscribe() {
        if (!this._json.subscribe)
            return null;
        return new Operation(this._json.subscribe, { kind: 'subscribe' });
    }
    hasPublish() {
        return !!this._json.publish;
    }
    hasSubscribe() {
        return !!this._json.subscribe;
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
}
