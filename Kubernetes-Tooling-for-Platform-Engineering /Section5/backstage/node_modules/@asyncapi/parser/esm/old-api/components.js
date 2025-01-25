import { SpecificationExtensionsModel, createMapOfType, getMapValue } from './mixins';
import { Channel } from './channel';
import { Message } from './message';
import { Schema } from './schema';
import { SecurityScheme } from './security-scheme';
import { Server } from './server';
import { ChannelParameter } from './channel-parameter';
import { CorrelationId } from './correlation-id';
import { OperationTrait } from './operation-trait';
import { MessageTrait } from './message-trait';
import { ServerVariable } from './server-variable';
export class Components extends SpecificationExtensionsModel {
    hasChannels() {
        return !!this._json.channels;
    }
    channels() {
        return createMapOfType(this._json.channels, Channel);
    }
    channel(name) {
        return getMapValue(this._json.channels, name, Channel);
    }
    hasMessages() {
        return !!this._json.messages;
    }
    messages() {
        return createMapOfType(this._json.messages, Message);
    }
    message(name) {
        return getMapValue(this._json.messages, name, Message);
    }
    hasSchemas() {
        return !!this._json.schemas;
    }
    schemas() {
        return createMapOfType(this._json.schemas, Schema);
    }
    schema(name) {
        return getMapValue(this._json.schemas, name, Schema);
    }
    hasSecuritySchemes() {
        return !!this._json.securitySchemes;
    }
    securitySchemes() {
        return createMapOfType(this._json.securitySchemes, SecurityScheme);
    }
    securityScheme(name) {
        return getMapValue(this._json.securitySchemes, name, SecurityScheme);
    }
    hasServers() {
        return !!this._json.servers;
    }
    servers() {
        return createMapOfType(this._json.servers, Server);
    }
    server(name) {
        return getMapValue(this._json.servers, name, Server);
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
    hasCorrelationIds() {
        return !!this._json.correlationIds;
    }
    correlationIds() {
        return createMapOfType(this._json.correlationIds, CorrelationId);
    }
    correlationId(name) {
        return getMapValue(this._json.correlationIds, name, CorrelationId);
    }
    hasOperationTraits() {
        return !!this._json.operationTraits;
    }
    operationTraits() {
        return createMapOfType(this._json.operationTraits, OperationTrait);
    }
    operationTrait(name) {
        return getMapValue(this._json.operationTraits, name, OperationTrait);
    }
    hasMessageTraits() {
        return !!this._json.messageTraits;
    }
    messageTraits() {
        return createMapOfType(this._json.messageTraits, MessageTrait);
    }
    messageTrait(name) {
        return getMapValue(this._json.messageTraits, name, MessageTrait);
    }
    hasServerVariables() {
        return !!this._json.serverVariables;
    }
    serverVariables() {
        return createMapOfType(this._json.serverVariables, ServerVariable);
    }
    serverVariable(name) {
        return getMapValue(this._json.serverVariables, name, ServerVariable);
    }
}
