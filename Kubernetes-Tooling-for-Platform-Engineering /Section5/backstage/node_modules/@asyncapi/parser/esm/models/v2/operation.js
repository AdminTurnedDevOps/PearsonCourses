import { Channels } from './channels';
import { Channel } from './channel';
import { Messages } from './messages';
import { Message } from './message';
import { OperationTraits } from './operation-traits';
import { OperationTrait } from './operation-trait';
import { Servers } from './servers';
import { tilde } from '../../utils';
export class Operation extends OperationTrait {
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
        return new Servers(servers);
    }
    channels() {
        const channels = [];
        Object.entries(this._meta.asyncapi.parsed.channels || {}).forEach(([channelAddress, channel]) => {
            if (channel.subscribe === this._json || channel.publish === this._json) {
                channels.push(this.createModel(Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${tilde(channelAddress)}` }));
            }
        });
        return new Channels(channels);
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
        return new Messages(messages.map((message, index) => {
            return this.createModel(Message, message, { id: '', pointer: `${this._meta.pointer}/message${isOneOf ? `/oneOf/${index}` : ''}` });
        }));
    }
    reply() {
        return;
    }
    traits() {
        return new OperationTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(OperationTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}`, action: '' });
        }));
    }
}
