import { Messages } from './messages';
import { Message } from './message';
import { Channels } from './channels';
import { Channel } from './channel';
import { OperationTraits } from './operation-traits';
import { OperationTrait } from './operation-trait';
import { OperationReply } from './operation-reply';
import { Servers } from './servers';
import { xParserObjectUniqueId } from '../../constants';
export class Operation extends OperationTrait {
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
        return new Servers(servers);
    }
    channels() {
        if (this._json.channel) {
            const operationChannelId = this._json.channel[xParserObjectUniqueId];
            return new Channels([
                this.createModel(Channel, this._json.channel, { id: operationChannelId, pointer: `/channels/${operationChannelId}` })
            ]);
        }
        return new Channels([]);
    }
    messages() {
        const messages = [];
        if (Array.isArray(this._json.messages)) {
            this._json.messages.forEach((message, index) => {
                const messageId = message[xParserObjectUniqueId];
                messages.push(this.createModel(Message, message, { id: messageId, pointer: this.jsonPath(`messages/${index}`) }));
            });
            return new Messages(messages);
        }
        this.channels().forEach(channel => {
            messages.push(...channel.messages());
        });
        return new Messages(messages);
    }
    hasReply() {
        return !!this._json.reply;
    }
    reply() {
        if (this._json.reply) {
            return this.createModel(OperationReply, this._json.reply, { pointer: this.jsonPath('reply') });
        }
    }
    traits() {
        return new OperationTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(OperationTrait, trait, { id: '', pointer: this.jsonPath(`traits/${index}`) });
        }));
    }
}
