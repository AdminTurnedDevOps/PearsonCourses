"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const base_1 = require("../base");
const channel_parameters_1 = require("./channel-parameters");
const channel_parameter_1 = require("./channel-parameter");
const messages_1 = require("./messages");
const operations_1 = require("./operations");
const operation_1 = require("./operation");
const servers_1 = require("./servers");
const server_1 = require("./server");
const mixins_1 = require("./mixins");
class Channel extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    address() {
        return this._meta.address;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    servers() {
        var _a;
        const servers = [];
        const allowedServers = this._json.servers || [];
        Object.entries(((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.servers) || {}).forEach(([serverName, server]) => {
            if (allowedServers.length === 0 || allowedServers.includes(serverName)) {
                servers.push(this.createModel(server_1.Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
            }
        });
        return new servers_1.Servers(servers);
    }
    operations() {
        const operations = [];
        ['publish', 'subscribe'].forEach(operationAction => {
            const operation = this._json[operationAction];
            const id = (operation && operation.operationId) || operationAction;
            if (operation) {
                operations.push(this.createModel(operation_1.Operation, operation, { id, action: operationAction, pointer: `${this._meta.pointer}/${operationAction}` }));
            }
        });
        return new operations_1.Operations(operations);
    }
    messages() {
        const messages = [];
        this.operations().forEach(operation => messages.push(...operation.messages().all()));
        return new messages_1.Messages(messages);
    }
    parameters() {
        return new channel_parameters_1.ChannelParameters(Object.entries(this._json.parameters || {}).map(([channelParameterName, channelParameter]) => {
            return this.createModel(channel_parameter_1.ChannelParameter, channelParameter, {
                id: channelParameterName,
                pointer: `${this._meta.pointer}/parameters/${channelParameterName}`
            });
        }));
    }
    bindings() {
        return (0, mixins_1.bindings)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Channel = Channel;
