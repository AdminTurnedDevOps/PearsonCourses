"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const channel_1 = require("./channel");
const channels_1 = require("./channels");
const operations_1 = require("./operations");
const operation_1 = require("./operation");
const message_traits_1 = require("./message-traits");
const message_trait_1 = require("./message-trait");
const servers_1 = require("./servers");
const schema_1 = require("./schema");
const constants_1 = require("../../constants");
class Message extends message_trait_1.MessageTrait {
    hasPayload() {
        return !!this._json.payload;
    }
    payload() {
        if (!this._json.payload)
            return undefined;
        return this.createModel(schema_1.Schema, this._json.payload, { pointer: this.jsonPath('payload') });
    }
    hasSchemaFormat() {
        // If it has a payload, schema format is expected (at least the default)
        return this.hasPayload();
    }
    schemaFormat() {
        var _a;
        if (this.hasSchemaFormat()) {
            return (_a = this.payload()) === null || _a === void 0 ? void 0 : _a.schemaFormat();
        }
        return undefined;
    }
    servers() {
        const servers = [];
        const serversData = [];
        this.channels().forEach(channel => {
            channel.servers().forEach(server => {
                const serverData = server.json();
                if (!serversData.includes(serverData)) {
                    serversData.push(serverData);
                    servers.push(server);
                }
            });
        });
        return new servers_1.Servers(servers);
    }
    channels() {
        var _a, _b;
        const thisMessageId = (this._json)[constants_1.xParserObjectUniqueId];
        const channels = [];
        const channelsData = [];
        this.operations().forEach(operation => {
            operation.channels().forEach(channel => {
                const channelData = channel.json();
                // Comparing with the data (JSON) because same channel could exist but it will include the ID based on where it is declared. For example, asyncapi.channels contain ID field.
                if (!channelsData.includes(channelData)) {
                    channelsData.push(channelData);
                    channels.push(channel);
                }
            });
        });
        Object.entries(((_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.channels) || {}).forEach(([channelId, channelData]) => {
            const channelModel = this.createModel(channel_1.Channel, channelData, { id: channelId, pointer: `/channels/${channelId}` });
            if (!channelsData.includes(channelData) && channelModel.messages().some(m => {
                const messageId = m[constants_1.xParserObjectUniqueId];
                return messageId === thisMessageId;
            })) {
                channelsData.push(channelData);
                channels.push(channelModel);
            }
        });
        return new channels_1.Channels(channels);
    }
    operations() {
        var _a, _b;
        const thisMessageId = (this._json)[constants_1.xParserObjectUniqueId];
        const operations = [];
        Object.entries(((_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.operations) || {}).forEach(([operationId, operation]) => {
            const operationModel = this.createModel(operation_1.Operation, operation, { id: operationId, pointer: `/operations/${operationId}` });
            const operationHasMessage = operationModel.messages().some(m => {
                const messageId = m[constants_1.xParserObjectUniqueId];
                return messageId === thisMessageId;
            });
            if (operationHasMessage) {
                operations.push(operationModel);
            }
        });
        return new operations_1.Operations(operations);
    }
    traits() {
        return new message_traits_1.MessageTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(message_trait_1.MessageTrait, trait, { id: '', pointer: this.jsonPath(`traits/${index}`) });
        }));
    }
}
exports.Message = Message;
