"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const channels_1 = require("./channels");
const operations_1 = require("./operations");
const operation_1 = require("./operation");
const message_traits_1 = require("./message-traits");
const message_trait_1 = require("./message-trait");
const servers_1 = require("./servers");
const schema_1 = require("./schema");
const utils_1 = require("../../utils");
class Message extends message_trait_1.MessageTrait {
    hasPayload() {
        return !!this._json.payload;
    }
    payload() {
        if (!this._json.payload)
            return undefined;
        return this.createModel(schema_1.Schema, this._json.payload, { pointer: `${this._meta.pointer}/payload`, schemaFormat: this._json.schemaFormat });
    }
    servers() {
        const servers = [];
        const serversData = [];
        this.channels().forEach(channel => {
            channel.servers().forEach(server => {
                if (!serversData.includes(server.json())) {
                    serversData.push(server.json());
                    servers.push(server);
                }
            });
        });
        return new servers_1.Servers(servers);
    }
    channels() {
        const channels = [];
        const channelsData = [];
        this.operations().all().forEach(operation => {
            operation.channels().forEach(channel => {
                if (!channelsData.includes(channel.json())) {
                    channelsData.push(channel.json());
                    channels.push(channel);
                }
            });
        });
        return new channels_1.Channels(channels);
    }
    operations() {
        var _a;
        const operations = [];
        Object.entries(((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.channels) || {}).forEach(([channelAddress, channel]) => {
            ['subscribe', 'publish'].forEach(operationAction => {
                const operation = channel[operationAction];
                if (operation && (operation.message === this._json ||
                    (operation.message.oneOf || []).includes(this._json))) {
                    operations.push(this.createModel(operation_1.Operation, operation, { id: '', pointer: `/channels/${(0, utils_1.tilde)(channelAddress)}/${operationAction}`, action: operationAction }));
                }
            });
        });
        return new operations_1.Operations(operations);
    }
    traits() {
        return new message_traits_1.MessageTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(message_trait_1.MessageTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}` });
        }));
    }
}
exports.Message = Message;
