"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAPIDocument = void 0;
const base_1 = require("../base");
const info_1 = require("./info");
const channels_1 = require("./channels");
const channel_1 = require("./channel");
const components_1 = require("./components");
const messages_1 = require("./messages");
const operations_1 = require("./operations");
const servers_1 = require("./servers");
const server_1 = require("./server");
const security_schemes_1 = require("./security-schemes");
const security_scheme_1 = require("./security-scheme");
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
        return new servers_1.Servers(Object.entries(this._json.servers || {}).map(([serverName, server]) => this.createModel(server_1.Server, server, { id: serverName, pointer: `/servers/${serverName}` })));
    }
    channels() {
        return new channels_1.Channels(Object.entries(this._json.channels || {}).map(([channelAddress, channel]) => this.createModel(channel_1.Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${(0, utils_1.tilde)(channelAddress)}` })));
    }
    operations() {
        const operations = [];
        this.channels().forEach(channel => operations.push(...channel.operations()));
        return new operations_1.Operations(operations);
    }
    messages() {
        const messages = [];
        this.operations().forEach(operation => operation.messages().forEach(message => (!messages.some(m => m.json() === message.json()) && messages.push(message))));
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
        const operations = [];
        this.allChannels().forEach(channel => operations.push(...channel.operations()));
        return new operations_1.Operations(operations);
    }
    allMessages() {
        const messages = [];
        this.allOperations().forEach(operation => operation.messages().forEach(message => (!messages.some(m => m.json() === message.json()) && messages.push(message))));
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
