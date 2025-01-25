"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAPIDocument = void 0;
const base_1 = require("../base");
const info_1 = require("./info");
const servers_1 = require("./servers");
const server_1 = require("./server");
const channels_1 = require("./channels");
const channel_1 = require("./channel");
const operations_1 = require("./operations");
const operation_1 = require("./operation");
const messages_1 = require("./messages");
const security_schemes_1 = require("./security-schemes");
const security_scheme_1 = require("./security-scheme");
const components_1 = require("./components");
const schemas_1 = require("./schemas");
const mixins_1 = require("./mixins");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
class AsyncAPIDocument extends base_1.BaseModel {
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
        return this.createModel(info_1.Info, this._json.info, { pointer: '/info' });
    }
    servers() {
        return new servers_1.Servers(Object.entries(this._json.servers || {}).map(([serverName, server]) => this.createModel(server_1.Server, server, { id: serverName, pointer: `/servers/${(0, utils_1.tilde)(serverName)}` })));
    }
    channels() {
        return new channels_1.Channels(Object.entries(this._json.channels || {}).map(([channelId, channel]) => this.createModel(channel_1.Channel, channel, { id: channelId, pointer: `/channels/${(0, utils_1.tilde)(channelId)}` })));
    }
    operations() {
        return new operations_1.Operations(Object.entries(this._json.operations || {}).map(([operationId, operation]) => this.createModel(operation_1.Operation, operation, { id: operationId, pointer: `/operations/${(0, utils_1.tilde)(operationId)}` })));
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
        return new messages_1.Messages(messages);
    }
    schemas() {
        return (0, utils_2.schemasFromDocument)(this, schemas_1.Schemas, false);
    }
    securitySchemes() {
        var _a;
        return new security_schemes_1.SecuritySchemes(Object.entries(((_a = this._json.components) === null || _a === void 0 ? void 0 : _a.securitySchemes) || {}).map(([securitySchemeName, securityScheme]) => this.createModel(security_scheme_1.SecurityScheme, securityScheme, { id: securitySchemeName, pointer: `/components/securitySchemes/${securitySchemeName}` })));
    }
    components() {
        return this.createModel(components_1.Components, this._json.components || {}, { pointer: '/components' });
    }
    allServers() {
        const servers = this.servers().all();
        this.components().servers().forEach(server => !servers.some(s => s.json() === server.json()) && servers.push(server));
        return new servers_1.Servers(servers);
    }
    allChannels() {
        const channels = this.channels().all();
        this.components().channels().forEach(channel => !channels.some(c => c.json() === channel.json()) && channels.push(channel));
        return new channels_1.Channels(channels);
    }
    allOperations() {
        const operations = this.operations().all();
        this.components().operations().forEach(operation => !operations.some(o => o.json() === operation.json()) && operations.push(operation));
        return new operations_1.Operations(operations);
    }
    allMessages() {
        const messages = this.messages().all();
        this.components().messages().forEach(message => (!messages.some(m => m.json() === message.json()) && messages.push(message)));
        return new messages_1.Messages(messages);
    }
    allSchemas() {
        return (0, utils_2.schemasFromDocument)(this, schemas_1.Schemas, true);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.AsyncAPIDocument = AsyncAPIDocument;
