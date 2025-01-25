import { BaseModel } from '../base';
import { Channel } from './channel';
import { Message } from './message';
import { Messages } from './messages';
import { OperationReplyAddress } from './operation-reply-address';
import { extensions } from './mixins';
import { xParserObjectUniqueId } from '../../constants';
export class OperationReply extends BaseModel {
    id() {
        return this._meta.id;
    }
    hasAddress() {
        return !!this._json.address;
    }
    address() {
        if (this._json.address) {
            return this.createModel(OperationReplyAddress, this._json.address, { pointer: this.jsonPath('address') });
        }
    }
    hasChannel() {
        return !!this._json.channel;
    }
    channel() {
        if (this._json.channel) {
            const channelId = this._json.channel[xParserObjectUniqueId];
            return this.createModel(Channel, this._json.channel, { id: channelId, pointer: this.jsonPath('channel') });
        }
        return this._json.channel;
    }
    messages() {
        var _a;
        return new Messages(Object.values((_a = this._json.messages) !== null && _a !== void 0 ? _a : {}).map((message) => {
            const messageId = message[xParserObjectUniqueId];
            return this.createModel(Message, message, { id: messageId, pointer: this.jsonPath(`messages/${messageId}`) });
        }));
    }
    extensions() {
        return extensions(this);
    }
}
