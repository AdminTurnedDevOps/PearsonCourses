"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = void 0;
const base_1 = require("../base");
const bindings_1 = require("./bindings");
const binding_1 = require("./binding");
const channel_1 = require("./channel");
const channel_parameter_1 = require("./channel-parameter");
const correlation_id_1 = require("./correlation-id");
const message_trait_1 = require("./message-trait");
const operation_trait_1 = require("./operation-trait");
const operation_reply_1 = require("./operation-reply");
const operation_reply_address_1 = require("./operation-reply-address");
const schema_1 = require("./schema");
const security_scheme_1 = require("./security-scheme");
const server_1 = require("./server");
const server_variable_1 = require("./server-variable");
const mixins_1 = require("./mixins");
const servers_1 = require("./servers");
const channels_1 = require("./channels");
const messages_1 = require("./messages");
const schemas_1 = require("./schemas");
const channel_parameters_1 = require("./channel-parameters");
const server_variables_1 = require("./server-variables");
const operation_traits_1 = require("./operation-traits");
const message_traits_1 = require("./message-traits");
const operation_replies_1 = require("./operation-replies");
const operation_reply_addresses_1 = require("./operation-reply-addresses");
const security_schemes_1 = require("./security-schemes");
const correlation_ids_1 = require("./correlation-ids");
const operations_1 = require("./operations");
const operation_1 = require("./operation");
const message_1 = require("./message");
const external_documentations_1 = require("../external-documentations");
const external_docs_1 = require("./external-docs");
const tags_1 = require("./tags");
const tag_1 = require("./tag");
const utils_1 = require("../../utils");
class Components extends base_1.BaseModel {
    servers() {
        return this.createCollection('servers', servers_1.Servers, server_1.Server);
    }
    channels() {
        return this.createCollection('channels', channels_1.Channels, channel_1.Channel);
    }
    operations() {
        return this.createCollection('operations', operations_1.Operations, operation_1.Operation);
    }
    messages() {
        return this.createCollection('messages', messages_1.Messages, message_1.Message);
    }
    schemas() {
        return this.createCollection('schemas', schemas_1.Schemas, schema_1.Schema);
    }
    channelParameters() {
        return this.createCollection('parameters', channel_parameters_1.ChannelParameters, channel_parameter_1.ChannelParameter);
    }
    serverVariables() {
        return this.createCollection('serverVariables', server_variables_1.ServerVariables, server_variable_1.ServerVariable);
    }
    operationTraits() {
        return this.createCollection('operationTraits', operation_traits_1.OperationTraits, operation_trait_1.OperationTrait);
    }
    messageTraits() {
        return this.createCollection('messageTraits', message_traits_1.MessageTraits, message_trait_1.MessageTrait);
    }
    replies() {
        return this.createCollection('replies', operation_replies_1.OperationReplies, operation_reply_1.OperationReply);
    }
    replyAddresses() {
        return this.createCollection('replyAddresses', operation_reply_addresses_1.OperationReplyAddresses, operation_reply_address_1.OperationReplyAddress);
    }
    correlationIds() {
        return this.createCollection('correlationIds', correlation_ids_1.CorrelationIds, correlation_id_1.CorrelationId);
    }
    securitySchemes() {
        return this.createCollection('securitySchemes', security_schemes_1.SecuritySchemes, security_scheme_1.SecurityScheme);
    }
    tags() {
        return this.createCollection('tags', tags_1.Tags, tag_1.Tag);
    }
    externalDocs() {
        return this.createCollection('externalDocs', external_documentations_1.ExternalDocumentations, external_docs_1.ExternalDocumentation);
    }
    serverBindings() {
        return this.createBindings('serverBindings');
    }
    channelBindings() {
        return this.createBindings('channelBindings');
    }
    operationBindings() {
        return this.createBindings('operationBindings');
    }
    messageBindings() {
        return this.createBindings('messageBindings');
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
    isEmpty() {
        return Object.keys(this._json).length === 0;
    }
    createCollection(itemsName, collectionModel, itemModel) {
        const collectionItems = [];
        Object.entries(this._json[itemsName] || {}).forEach(([id, item]) => {
            collectionItems.push(this.createModel(itemModel, item, { id, pointer: `/components/${itemsName}/${(0, utils_1.tilde)(id)}` }));
        });
        return new collectionModel(collectionItems);
    }
    createBindings(itemsName) {
        return Object.entries(this._json[itemsName] || {}).reduce((bindings, [name, item]) => {
            const bindingsData = item || {};
            const asyncapi = this.meta('asyncapi');
            const pointer = `components/${itemsName}/${name}`;
            bindings[name] = new bindings_1.Bindings(Object.entries(bindingsData).map(([protocol, binding]) => this.createModel(binding_1.Binding, binding, { protocol, pointer: `${pointer}/${protocol}` })), { originalData: bindingsData, asyncapi, pointer });
            return bindings;
        }, {});
    }
}
exports.Components = Components;
