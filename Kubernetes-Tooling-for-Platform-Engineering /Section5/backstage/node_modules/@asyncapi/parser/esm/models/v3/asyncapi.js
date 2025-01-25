import { BaseModel } from '../base';
import { Info } from './info';
import { Servers } from './servers';
import { Server } from './server';
import { Channels } from './channels';
import { Channel } from './channel';
import { Operations } from './operations';
import { Operation } from './operation';
import { Messages } from './messages';
import { SecuritySchemes } from './security-schemes';
import { SecurityScheme } from './security-scheme';
import { Components } from './components';
import { Schemas } from './schemas';
import { extensions } from './mixins';
import { tilde } from '../../utils';
import { schemasFromDocument } from '../utils';
export class AsyncAPIDocument extends BaseModel {
    version() {
        return this._json.asyncapi;
    }
    defaultContentType() {
        return this._json.defaultContentType;
    }
    hasDefaultContentType() {
        return !!this._json.defaultContentType;
    }
    info() {
        return this.createModel(Info, this._json.info, { pointer: '/info' });
    }
    servers() {
        return new Servers(Object.entries(this._json.servers || {}).map(([serverName, server]) => this.createModel(Server, server, { id: serverName, pointer: `/servers/${tilde(serverName)}` })));
    }
    channels() {
        return new Channels(Object.entries(this._json.channels || {}).map(([channelId, channel]) => this.createModel(Channel, channel, { id: channelId, pointer: `/channels/${tilde(channelId)}` })));
    }
    operations() {
        return new Operations(Object.entries(this._json.operations || {}).map(([operationId, operation]) => this.createModel(Operation, operation, { id: operationId, pointer: `/operations/${tilde(operationId)}` })));
    }
    messages() {
        const messages = [];
        const messagesData = [];
        this.channels().forEach(channel => {
            channel.messages().forEach(message => {
                const messageData = message.json();
                if (!messagesData.includes(messageData)) {
                    messagesData.push(messageData);
                    messages.push(message);
                }
            });
        });
        return new Messages(messages);
    }
    schemas() {
        return schemasFromDocument(this, Schemas, false);
    }
    securitySchemes() {
        var _a;
        return new SecuritySchemes(Object.entries(((_a = this._json.components) === null || _a === void 0 ? void 0 : _a.securitySchemes) || {}).map(([securitySchemeName, securityScheme]) => this.createModel(SecurityScheme, securityScheme, { id: securitySchemeName, pointer: `/components/securitySchemes/${securitySchemeName}` })));
    }
    components() {
        return this.createModel(Components, this._json.components || {}, { pointer: '/components' });
    }
    allServers() {
        const servers = this.servers().all();
        this.components().servers().forEach(server => !servers.some(s => s.json() === server.json()) && servers.push(server));
        return new Servers(servers);
    }
    allChannels() {
        const channels = this.channels().all();
        this.components().channels().forEach(channel => !channels.some(c => c.json() === channel.json()) && channels.push(channel));
        return new Channels(channels);
    }
    allOperations() {
        const operations = this.operations().all();
        this.components().operations().forEach(operation => !operations.some(o => o.json() === operation.json()) && operations.push(operation));
        return new Operations(operations);
    }
    allMessages() {
        const messages = this.messages().all();
        this.components().messages().forEach(message => (!messages.some(m => m.json() === message.json()) && messages.push(message)));
        return new Messages(messages);
    }
    allSchemas() {
        return schemasFromDocument(this, Schemas, true);
    }
    extensions() {
        return extensions(this);
    }
}
