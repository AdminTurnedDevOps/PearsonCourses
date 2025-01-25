"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const channel_parameters_1 = require("./channel-parameters");
const channel_parameter_1 = require("./channel-parameter");
const messages_1 = require("./messages");
const message_1 = require("./message");
const operations_1 = require("./operations");
const operation_1 = require("./operation");
const servers_1 = require("./servers");
const server_1 = require("./server");
const constants_1 = require("../../constants");
const mixins_1 = require("./mixins");
class Channel extends mixins_1.CoreModel {
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
                servers.push(this.createModel(server_1.Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
            }
        });
        return new servers_1.Servers(servers);
    }
    operations() {
        var _a, _b, _c;
        const operations = [];
        Object.entries(((_c = (_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.operations) !== null && _c !== void 0 ? _c : {})).forEach(([operationId, operation]) => {
            const operationChannelId = operation.channel[constants_1.xParserObjectUniqueId];
            const channelId = this._json[constants_1.xParserObjectUniqueId];
            if (operationChannelId === channelId) {
                operations.push(this.createModel(operation_1.Operation, operation, { id: operationId, pointer: `/operations/${operationId}` }));
            }
        });
        return new operations_1.Operations(operations);
    }
    messages() {
        var _a;
        return new messages_1.Messages(Object.entries((_a = this._json.messages) !== null && _a !== void 0 ? _a : {}).map(([messageName, message]) => {
            return this.createModel(message_1.Message, message, { id: messageName, pointer: this.jsonPath(`messages/${messageName}`) });
        }));
    }
    parameters() {
        var _a;
        return new channel_parameters_1.ChannelParameters(Object.entries((_a = this._json.parameters) !== null && _a !== void 0 ? _a : {}).map(([channelParameterName, channelParameter]) => {
            return this.createModel(channel_parameter_1.ChannelParameter, channelParameter, {
                id: channelParameterName,
                pointer: this.jsonPath(`parameters/${channelParameterName}`),
            });
        }));
    }
}
exports.Channel = Channel;
