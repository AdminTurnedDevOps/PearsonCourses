"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const channels_1 = require("./channels");
const channel_1 = require("./channel");
const messages_1 = require("./messages");
const operations_1 = require("./operations");
const security_scheme_1 = require("./security-scheme");
const server_variables_1 = require("./server-variables");
const server_variable_1 = require("./server-variable");
const security_requirements_1 = require("./security-requirements");
const security_requirement_1 = require("./security-requirement");
const mixins_1 = require("./mixins");
const utils_1 = require("../../utils");
class Server extends mixins_1.CoreModel {
    id() {
        return this._meta.id;
    }
    url() {
        let host = this.host();
        if (!host.endsWith('/')) {
            host = `${host}/`;
        }
        let pathname = this.pathname() || '';
        if (pathname.startsWith('/')) {
            pathname = pathname.substring(1);
        }
        return `${this.protocol()}://${host}${pathname}`;
    }
    host() {
        return this._json.host;
    }
    protocol() {
        return this._json.protocol;
    }
    hasPathname() {
        return !!this._json.pathname;
    }
    pathname() {
        return this._json.pathname;
    }
    hasProtocolVersion() {
        return !!this._json.protocolVersion;
    }
    protocolVersion() {
        return this._json.protocolVersion;
    }
    channels() {
        var _a, _b;
        const channels = [];
        Object.entries(((_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.channels) || {}).forEach(([channelName, channel]) => {
            const allowedServers = channel.servers || [];
            if (allowedServers.length === 0 || allowedServers.includes(this._json)) {
                channels.push(this.createModel(channel_1.Channel, channel, { id: channelName, pointer: `/channels/${(0, utils_1.tilde)(channelName)}` }));
            }
        });
        return new channels_1.Channels(channels);
    }
    operations() {
        const operations = [];
        const operationsData = [];
        this.channels().forEach(channel => {
            channel.operations().forEach(operation => {
                const operationData = operation.json();
                if (!operationsData.includes(operationData)) {
                    operations.push(operation);
                    operationsData.push(operationData);
                }
            });
        });
        return new operations_1.Operations(operations);
    }
    messages() {
        const messages = [];
        const messagedData = [];
        this.channels().forEach(channel => {
            channel.messages().forEach(message => {
                const messageData = message.json();
                if (!messagedData.includes(messageData)) {
                    messages.push(message);
                    messagedData.push(messageData);
                }
            });
        });
        return new messages_1.Messages(messages);
    }
    variables() {
        return new server_variables_1.ServerVariables(Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
            return this.createModel(server_variable_1.ServerVariable, serverVariable, {
                id: serverVariableName,
                pointer: this.jsonPath(`variables/${serverVariableName}`),
            });
        }));
    }
    security() {
        return (this._json.security || []).map((security, index) => {
            const scheme = this.createModel(security_scheme_1.SecurityScheme, security, { id: '', pointer: this.jsonPath(`security/${index}`) });
            const requirement = this.createModel(security_requirement_1.SecurityRequirement, { scheme, scopes: security.scopes }, { id: '', pointer: this.jsonPath(`security/${index}`) });
            return new security_requirements_1.SecurityRequirements([requirement]);
        });
    }
}
exports.Server = Server;
