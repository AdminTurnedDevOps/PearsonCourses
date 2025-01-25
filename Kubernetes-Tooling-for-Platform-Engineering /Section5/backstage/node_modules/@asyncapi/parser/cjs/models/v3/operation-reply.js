"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationReply = void 0;
const base_1 = require("../base");
const channel_1 = require("./channel");
const message_1 = require("./message");
const messages_1 = require("./messages");
const operation_reply_address_1 = require("./operation-reply-address");
const mixins_1 = require("./mixins");
const constants_1 = require("../../constants");
class OperationReply extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    hasAddress() {
        return !!this._json.address;
    }
    address() {
        if (this._json.address) {
            return this.createModel(operation_reply_address_1.OperationReplyAddress, this._json.address, { pointer: this.jsonPath('address') });
        }
    }
    hasChannel() {
        return !!this._json.channel;
    }
    channel() {
        if (this._json.channel) {
            const channelId = this._json.channel[constants_1.xParserObjectUniqueId];
            return this.createModel(channel_1.Channel, this._json.channel, { id: channelId, pointer: this.jsonPath('channel') });
        }
        return this._json.channel;
    }
    messages() {
        var _a;
        return new messages_1.Messages(Object.values((_a = this._json.messages) !== null && _a !== void 0 ? _a : {}).map((message) => {
            const messageId = message[constants_1.xParserObjectUniqueId];
            return this.createModel(message_1.Message, message, { id: messageId, pointer: this.jsonPath(`messages/${messageId}`) });
        }));
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.OperationReply = OperationReply;
