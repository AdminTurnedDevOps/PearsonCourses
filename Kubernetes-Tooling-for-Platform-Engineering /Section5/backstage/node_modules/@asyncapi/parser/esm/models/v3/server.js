import { Channels } from './channels';
import { Channel } from './channel';
import { Messages } from './messages';
import { Operations } from './operations';
import { SecurityScheme } from './security-scheme';
import { ServerVariables } from './server-variables';
import { ServerVariable } from './server-variable';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';
import { CoreModel } from './mixins';
import { tilde } from '../../utils';
export class Server extends CoreModel {
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
                channels.push(this.createModel(Channel, channel, { id: channelName, pointer: `/channels/${tilde(channelName)}` }));
            }
        });
        return new Channels(channels);
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
        return new Operations(operations);
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
        return new Messages(messages);
    }
    variables() {
        return new ServerVariables(Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
            return this.createModel(ServerVariable, serverVariable, {
                id: serverVariableName,
                pointer: this.jsonPath(`variables/${serverVariableName}`),
            });
        }));
    }
    security() {
        return (this._json.security || []).map((security, index) => {
            const scheme = this.createModel(SecurityScheme, security, { id: '', pointer: this.jsonPath(`security/${index}`) });
            const requirement = this.createModel(SecurityRequirement, { scheme, scopes: security.scopes }, { id: '', pointer: this.jsonPath(`security/${index}`) });
            return new SecurityRequirements([requirement]);
        });
    }
}
