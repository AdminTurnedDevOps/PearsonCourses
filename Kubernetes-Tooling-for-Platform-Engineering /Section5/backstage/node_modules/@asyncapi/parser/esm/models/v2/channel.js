import { BaseModel } from '../base';
import { ChannelParameters } from './channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from './messages';
import { Operations } from './operations';
import { Operation } from './operation';
import { Servers } from './servers';
import { Server } from './server';
import { bindings, hasDescription, description, extensions } from './mixins';
export class Channel extends BaseModel {
    id() {
        return this._meta.id;
    }
    address() {
        return this._meta.address;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    servers() {
        var _a;
        const servers = [];
        const allowedServers = this._json.servers || [];
        Object.entries(((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.servers) || {}).forEach(([serverName, server]) => {
            if (allowedServers.length === 0 || allowedServers.includes(serverName)) {
                servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
            }
        });
        return new Servers(servers);
    }
    operations() {
        const operations = [];
        ['publish', 'subscribe'].forEach(operationAction => {
            const operation = this._json[operationAction];
            const id = (operation && operation.operationId) || operationAction;
            if (operation) {
                operations.push(this.createModel(Operation, operation, { id, action: operationAction, pointer: `${this._meta.pointer}/${operationAction}` }));
            }
        });
        return new Operations(operations);
    }
    messages() {
        const messages = [];
        this.operations().forEach(operation => messages.push(...operation.messages().all()));
        return new Messages(messages);
    }
    parameters() {
        return new ChannelParameters(Object.entries(this._json.parameters || {}).map(([channelParameterName, channelParameter]) => {
            return this.createModel(ChannelParameter, channelParameter, {
                id: channelParameterName,
                pointer: `${this._meta.pointer}/parameters/${channelParameterName}`
            });
        }));
    }
    bindings() {
        return bindings(this);
    }
    extensions() {
        return extensions(this);
    }
}
