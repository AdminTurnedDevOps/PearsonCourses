import { Channel } from './channel';
import { Channels } from './channels';
import { Operations } from './operations';
import { Operation } from './operation';
import { MessageTraits } from './message-traits';
import { MessageTrait } from './message-trait';
import { Servers } from './servers';
import { Schema } from './schema';
import { xParserObjectUniqueId } from '../../constants';
export class Message extends MessageTrait {
    hasPayload() {
        return !!this._json.payload;
    }
    payload() {
        if (!this._json.payload)
            return undefined;
        return this.createModel(Schema, this._json.payload, { pointer: this.jsonPath('payload') });
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
        return new Servers(servers);
    }
    channels() {
        var _a, _b;
        const thisMessageId = (this._json)[xParserObjectUniqueId];
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
            const channelModel = this.createModel(Channel, channelData, { id: channelId, pointer: `/channels/${channelId}` });
            if (!channelsData.includes(channelData) && channelModel.messages().some(m => {
                const messageId = m[xParserObjectUniqueId];
                return messageId === thisMessageId;
            })) {
                channelsData.push(channelData);
                channels.push(channelModel);
            }
        });
        return new Channels(channels);
    }
    operations() {
        var _a, _b;
        const thisMessageId = (this._json)[xParserObjectUniqueId];
        const operations = [];
        Object.entries(((_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.operations) || {}).forEach(([operationId, operation]) => {
            const operationModel = this.createModel(Operation, operation, { id: operationId, pointer: `/operations/${operationId}` });
            const operationHasMessage = operationModel.messages().some(m => {
                const messageId = m[xParserObjectUniqueId];
                return messageId === thisMessageId;
            });
            if (operationHasMessage) {
                operations.push(operationModel);
            }
        });
        return new Operations(operations);
    }
    traits() {
        return new MessageTraits((this._json.traits || []).map((trait, index) => {
            return this.createModel(MessageTrait, trait, { id: '', pointer: this.jsonPath(`traits/${index}`) });
        }));
    }
}
