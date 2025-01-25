import { ChannelParameters } from './channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from './messages';
import { Message } from './message';
import { Operations } from './operations';
import { Operation } from './operation';
import { Servers } from './servers';
import { Server } from './server';
import { xParserObjectUniqueId } from '../../constants';
import { CoreModel } from './mixins';
export class Channel extends CoreModel {
    id() {
        return this._meta.id;
    }
    address() {
        return this._json.address;
    }
    servers() {
        var _a, _b, _c;
        const servers = [];
        const allowedServers = (_a = this._json.servers) !== null && _a !== void 0 ? _a : [];
        Object.entries((_c = (_b = this._meta.asyncapi) === null || _b === void 0 ? void 0 : _b.parsed.servers) !== null && _c !== void 0 ? _c : {}).forEach(([serverName, server]) => {
            if (allowedServers.length === 0 || allowedServers.includes(server)) {
                servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
            }
        });
        return new Servers(servers);
    }
    operations() {
        var _a, _b, _c;
        const operations = [];
        Object.entries(((_c = (_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.operations) !== null && _c !== void 0 ? _c : {})).forEach(([operationId, operation]) => {
            const operationChannelId = operation.channel[xParserObjectUniqueId];
            const channelId = this._json[xParserObjectUniqueId];
            if (operationChannelId === channelId) {
                operations.push(this.createModel(Operation, operation, { id: operationId, pointer: `/operations/${operationId}` }));
            }
        });
        return new Operations(operations);
    }
    messages() {
        var _a;
        return new Messages(Object.entries((_a = this._json.messages) !== null && _a !== void 0 ? _a : {}).map(([messageName, message]) => {
            return this.createModel(Message, message, { id: messageName, pointer: this.jsonPath(`messages/${messageName}`) });
        }));
    }
    parameters() {
        var _a;
        return new ChannelParameters(Object.entries((_a = this._json.parameters) !== null && _a !== void 0 ? _a : {}).map(([channelParameterName, channelParameter]) => {
            return this.createModel(ChannelParameter, channelParameter, {
                id: channelParameterName,
                pointer: this.jsonPath(`parameters/${channelParameterName}`),
            });
        }));
    }
}
