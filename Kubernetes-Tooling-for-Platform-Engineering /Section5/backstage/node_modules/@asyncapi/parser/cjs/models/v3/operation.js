"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const messages_1 = require("./messages");
const message_1 = require("./message");
const channels_1 = require("./channels");
const channel_1 = require("./channel");
const operation_traits_1 = require("./operation-traits");
const operation_trait_1 = require("./operation-trait");
const operation_reply_1 = require("./operation-reply");
const servers_1 = require("./servers");
const constants_1 = require("../../constants");
class Operation extends operation_trait_1.OperationTrait {
    action() {
        return this._json.action;
    }
    isSend() {
        return this.action() === 'send';
    }
    isReceive() {
        return this.action() === 'receive';
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
        if (this._json.channel) {
            const operationChannelId = this._json.channel[constants_1.xParserObjectUniqueId];
            return new channels_1.Channels([
                this.createModel(channel_1.Channel, this._json.channel, { id: operationChannelId, pointer: `/channels/${operationChannelId}` })
            ]);
        }
        return new channels_1.Channels([]);
    }
    messages() {
        const messages = [];
        if (Array.isArray(this._json.messages)) {
            this._json.messages.forEach((message, index) => {
                const messageId = message[constants_1.xParserObjectUniqueId];
                messages.push(this.createModel(message_1.Message, message, { id: messageId, pointer: this.jsonPath(`messages/${index}`) }));
            });
            return new messages_1.Messages(messages);
        }
        this.channels().forEach(channel => {
            messages.push(...channel.messages());
        });
        return new messages_1.Messages(messages);
    }
    hasReply() {
        return !!this._json.reply;
    }
    reply() {
        if (this._json.reply) {
            return this.createModel(operation_reply_1.OperationReply, this._json.reply, { pointer: this.jsonPath('reply') });
        }
    }
    traits() {
        return new operation_traits_1.OperationTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(operation_trait_1.OperationTrait, trait, { id: '', pointer: this.jsonPath(`traits/${index}`) });
        }));
    }
}
exports.Operation = Operation;
