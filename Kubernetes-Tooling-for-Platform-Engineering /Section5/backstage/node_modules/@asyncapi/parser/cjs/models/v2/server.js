"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const base_1 = require("../base");
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
class Server extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    url() {
        return this._json.url;
    }
    host() {
        const url = new URL(this.url());
        return url.host;
    }
    hasPathname() {
        return !!this.pathname();
    }
    pathname() {
        const url = new URL(this.url());
        return url.pathname;
    }
    protocol() {
        return this._json.protocol;
    }
    hasProtocolVersion() {
        return !!this._json.protocolVersion;
    }
    protocolVersion() {
        return this._json.protocolVersion;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    channels() {
        var _a;
        const channels = [];
        Object.entries(((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.channels) || {}).forEach(([channelAddress, channel]) => {
            const allowedServers = channel.servers || [];
            if (allowedServers.length === 0 || allowedServers.includes(this._meta.id)) {
                channels.push(this.createModel(channel_1.Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${(0, utils_1.tilde)(channelAddress)}` }));
            }
        });
        return new channels_1.Channels(channels);
    }
    operations() {
        const operations = [];
        this.channels().forEach(channel => {
            operations.push(...channel.operations().all());
        });
        return new operations_1.Operations(operations);
    }
    messages() {
        const messages = [];
        this.operations().forEach(operation => messages.push(...operation.messages().all()));
        return new messages_1.Messages(messages);
    }
    variables() {
        return new server_variables_1.ServerVariables(Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
            return this.createModel(server_variable_1.ServerVariable, serverVariable, {
                id: serverVariableName,
                pointer: `${this._meta.pointer}/variables/${serverVariableName}`
            });
        }));
    }
    security() {
        var _a, _b, _c, _d;
        const securitySchemes = (((_d = (_c = (_b = (_a = this._meta) === null || _a === void 0 ? void 0 : _a.asyncapi) === null || _b === void 0 ? void 0 : _b.parsed) === null || _c === void 0 ? void 0 : _c.components) === null || _d === void 0 ? void 0 : _d.securitySchemes) || {});
        return (this._json.security || []).map((requirement, index) => {
            const requirements = [];
            Object.entries(requirement).forEach(([security, scopes]) => {
                const scheme = this.createModel(security_scheme_1.SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
                requirements.push(this.createModel(security_requirement_1.SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` }));
            });
            return new security_requirements_1.SecurityRequirements(requirements);
        });
    }
    tags() {
        return (0, mixins_1.tags)(this);
    }
    bindings() {
        return (0, mixins_1.bindings)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Server = Server;
