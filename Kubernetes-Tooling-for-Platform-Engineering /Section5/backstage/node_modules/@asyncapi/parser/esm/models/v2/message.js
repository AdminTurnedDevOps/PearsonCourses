import { Channels } from './channels';
import { Operations } from './operations';
import { Operation } from './operation';
import { MessageTraits } from './message-traits';
import { MessageTrait } from './message-trait';
import { Servers } from './servers';
import { Schema } from './schema';
import { tilde } from '../../utils';
export class Message extends MessageTrait {
    hasPayload() {
        return !!this._json.payload;
    }
    payload() {
        if (!this._json.payload)
            return undefined;
        return this.createModel(Schema, this._json.payload, { pointer: `${this._meta.pointer}/payload`, schemaFormat: this._json.schemaFormat });
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
        const channelsData = [];
        this.operations().all().forEach(operation => {
            operation.channels().forEach(channel => {
                if (!channelsData.includes(channel.json())) {
                    channelsData.push(channel.json());
                    channels.push(channel);
                }
            });
        });
        return new Channels(channels);
    }
    operations() {
        var _a;
        const operations = [];
        Object.entries(((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.channels) || {}).forEach(([channelAddress, channel]) => {
            ['subscribe', 'publish'].forEach(operationAction => {
                const operation = channel[operationAction];
                if (operation && (operation.message === this._json ||
                    (operation.message.oneOf || []).includes(this._json))) {
                    operations.push(this.createModel(Operation, operation, { id: '', pointer: `/channels/${tilde(channelAddress)}/${operationAction}`, action: operationAction }));
                }
            });
        });
        return new Operations(operations);
    }
    traits() {
        return new MessageTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(MessageTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}` });
        }));
    }
}
