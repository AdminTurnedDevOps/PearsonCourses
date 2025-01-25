import { BaseModel } from '../base';
import { Bindings } from './bindings';
import { Binding } from './binding';
import { Channel } from './channel';
import { ChannelParameter } from './channel-parameter';
import { CorrelationId } from './correlation-id';
import { MessageTrait } from './message-trait';
import { OperationTrait } from './operation-trait';
import { OperationReply } from './operation-reply';
import { OperationReplyAddress } from './operation-reply-address';
import { Schema } from './schema';
import { SecurityScheme } from './security-scheme';
import { Server } from './server';
import { ServerVariable } from './server-variable';
import { extensions } from './mixins';
import { Servers } from './servers';
import { Channels } from './channels';
import { Messages } from './messages';
import { Schemas } from './schemas';
import { ChannelParameters } from './channel-parameters';
import { ServerVariables } from './server-variables';
import { OperationTraits } from './operation-traits';
import { MessageTraits } from './message-traits';
import { OperationReplies } from './operation-replies';
import { OperationReplyAddresses } from './operation-reply-addresses';
import { SecuritySchemes } from './security-schemes';
import { CorrelationIds } from './correlation-ids';
import { Operations } from './operations';
import { Operation } from './operation';
import { Message } from './message';
import { ExternalDocumentations } from '../external-documentations';
import { ExternalDocumentation } from './external-docs';
import { Tags } from './tags';
import { Tag } from './tag';
import { tilde } from '../../utils';
export class Components extends BaseModel {
    servers() {
        return this.createCollection('servers', Servers, Server);
    }
    channels() {
        return this.createCollection('channels', Channels, Channel);
    }
    operations() {
        return this.createCollection('operations', Operations, Operation);
    }
    messages() {
        return this.createCollection('messages', Messages, Message);
    }
    schemas() {
        return this.createCollection('schemas', Schemas, Schema);
    }
    channelParameters() {
        return this.createCollection('parameters', ChannelParameters, ChannelParameter);
    }
    serverVariables() {
        return this.createCollection('serverVariables', ServerVariables, ServerVariable);
    }
    operationTraits() {
        return this.createCollection('operationTraits', OperationTraits, OperationTrait);
    }
    messageTraits() {
        return this.createCollection('messageTraits', MessageTraits, MessageTrait);
    }
    replies() {
        return this.createCollection('replies', OperationReplies, OperationReply);
    }
    replyAddresses() {
        return this.createCollection('replyAddresses', OperationReplyAddresses, OperationReplyAddress);
    }
    correlationIds() {
        return this.createCollection('correlationIds', CorrelationIds, CorrelationId);
    }
    securitySchemes() {
        return this.createCollection('securitySchemes', SecuritySchemes, SecurityScheme);
    }
    tags() {
        return this.createCollection('tags', Tags, Tag);
    }
    externalDocs() {
        return this.createCollection('externalDocs', ExternalDocumentations, ExternalDocumentation);
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
        return extensions(this);
    }
    isEmpty() {
        return Object.keys(this._json).length === 0;
    }
    createCollection(itemsName, collectionModel, itemModel) {
        const collectionItems = [];
        Object.entries(this._json[itemsName] || {}).forEach(([id, item]) => {
            collectionItems.push(this.createModel(itemModel, item, { id, pointer: `/components/${itemsName}/${tilde(id)}` }));
        });
        return new collectionModel(collectionItems);
    }
    createBindings(itemsName) {
        return Object.entries(this._json[itemsName] || {}).reduce((bindings, [name, item]) => {
            const bindingsData = item || {};
            const asyncapi = this.meta('asyncapi');
            const pointer = `components/${itemsName}/${name}`;
            bindings[name] = new Bindings(Object.entries(bindingsData).map(([protocol, binding]) => this.createModel(Binding, binding, { protocol, pointer: `${pointer}/${protocol}` })), { originalData: bindingsData, asyncapi, pointer });
            return bindings;
        }, {});
    }
}
