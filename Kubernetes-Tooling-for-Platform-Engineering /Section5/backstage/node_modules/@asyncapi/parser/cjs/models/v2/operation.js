"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const channels_1 = require("./channels");
const channel_1 = require("./channel");
const messages_1 = require("./messages");
const message_1 = require("./message");
const operation_traits_1 = require("./operation-traits");
const operation_trait_1 = require("./operation-trait");
const servers_1 = require("./servers");
const utils_1 = require("../../utils");
class Operation extends operation_trait_1.OperationTrait {
    action() {
        return this._meta.action;
    }
    isSend() {
        return this.action() === 'subscribe';
    }
    isReceive() {
        return this.action() === 'publish';
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
        Object.entries(this._meta.asyncapi.parsed.channels || {}).forEach(([channelAddress, channel]) => {
            if (channel.subscribe === this._json || channel.publish === this._json) {
                channels.push(this.createModel(channel_1.Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${(0, utils_1.tilde)(channelAddress)}` }));
            }
        });
        return new channels_1.Channels(channels);
    }
    messages() {
        let isOneOf = false;
        let messages = [];
        if (this._json.message) {
            if (Array.isArray(this._json.message.oneOf)) {
                messages = this._json.message.oneOf;
                isOneOf = true;
            }
            else {
                messages = [this._json.message];
            }
        }
        return new messages_1.Messages(messages.map((message, index) => {
            return this.createModel(message_1.Message, message, { id: '', pointer: `${this._meta.pointer}/message${isOneOf ? `/oneOf/${index}` : ''}` });
        }));
    }
    reply() {
        return;
    }
    traits() {
        return new operation_traits_1.OperationTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(operation_trait_1.OperationTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}`, action: '' });
        }));
    }
}
exports.Operation = Operation;
