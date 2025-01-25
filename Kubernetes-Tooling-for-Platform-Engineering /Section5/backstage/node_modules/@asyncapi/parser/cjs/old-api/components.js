"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = void 0;
const mixins_1 = require("./mixins");
const channel_1 = require("./channel");
const message_1 = require("./message");
const schema_1 = require("./schema");
const security_scheme_1 = require("./security-scheme");
const server_1 = require("./server");
const channel_parameter_1 = require("./channel-parameter");
const correlation_id_1 = require("./correlation-id");
const operation_trait_1 = require("./operation-trait");
const message_trait_1 = require("./message-trait");
const server_variable_1 = require("./server-variable");
class Components extends mixins_1.SpecificationExtensionsModel {
    hasChannels() {
        return !!this._json.channels;
    }
    channels() {
        return (0, mixins_1.createMapOfType)(this._json.channels, channel_1.Channel);
    }
    channel(name) {
        return (0, mixins_1.getMapValue)(this._json.channels, name, channel_1.Channel);
    }
    hasMessages() {
        return !!this._json.messages;
    }
    messages() {
        return (0, mixins_1.createMapOfType)(this._json.messages, message_1.Message);
    }
    message(name) {
        return (0, mixins_1.getMapValue)(this._json.messages, name, message_1.Message);
    }
    hasSchemas() {
        return !!this._json.schemas;
    }
    schemas() {
        return (0, mixins_1.createMapOfType)(this._json.schemas, schema_1.Schema);
    }
    schema(name) {
        return (0, mixins_1.getMapValue)(this._json.schemas, name, schema_1.Schema);
    }
    hasSecuritySchemes() {
        return !!this._json.securitySchemes;
    }
    securitySchemes() {
        return (0, mixins_1.createMapOfType)(this._json.securitySchemes, security_scheme_1.SecurityScheme);
    }
    securityScheme(name) {
        return (0, mixins_1.getMapValue)(this._json.securitySchemes, name, security_scheme_1.SecurityScheme);
    }
    hasServers() {
        return !!this._json.servers;
    }
    servers() {
        return (0, mixins_1.createMapOfType)(this._json.servers, server_1.Server);
    }
    server(name) {
        return (0, mixins_1.getMapValue)(this._json.servers, name, server_1.Server);
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
    hasCorrelationIds() {
        return !!this._json.correlationIds;
    }
    correlationIds() {
        return (0, mixins_1.createMapOfType)(this._json.correlationIds, correlation_id_1.CorrelationId);
    }
    correlationId(name) {
        return (0, mixins_1.getMapValue)(this._json.correlationIds, name, correlation_id_1.CorrelationId);
    }
    hasOperationTraits() {
        return !!this._json.operationTraits;
    }
    operationTraits() {
        return (0, mixins_1.createMapOfType)(this._json.operationTraits, operation_trait_1.OperationTrait);
    }
    operationTrait(name) {
        return (0, mixins_1.getMapValue)(this._json.operationTraits, name, operation_trait_1.OperationTrait);
    }
    hasMessageTraits() {
        return !!this._json.messageTraits;
    }
    messageTraits() {
        return (0, mixins_1.createMapOfType)(this._json.messageTraits, message_trait_1.MessageTrait);
    }
    messageTrait(name) {
        return (0, mixins_1.getMapValue)(this._json.messageTraits, name, message_trait_1.MessageTrait);
    }
    hasServerVariables() {
        return !!this._json.serverVariables;
    }
    serverVariables() {
        return (0, mixins_1.createMapOfType)(this._json.serverVariables, server_variable_1.ServerVariable);
    }
    serverVariable(name) {
        return (0, mixins_1.getMapValue)(this._json.serverVariables, name, server_variable_1.ServerVariable);
    }
}
exports.Components = Components;
