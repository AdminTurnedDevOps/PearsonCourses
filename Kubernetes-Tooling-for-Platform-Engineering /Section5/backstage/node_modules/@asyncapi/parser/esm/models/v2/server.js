import { BaseModel } from '../base';
import { Channels } from './channels';
import { Channel } from './channel';
import { Messages } from './messages';
import { Operations } from './operations';
import { SecurityScheme } from './security-scheme';
import { ServerVariables } from './server-variables';
import { ServerVariable } from './server-variable';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';
import { bindings, hasDescription, description, extensions, tags } from './mixins';
import { tilde } from '../../utils';
export class Server extends BaseModel {
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
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    channels() {
        var _a;
        const channels = [];
        Object.entries(((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.channels) || {}).forEach(([channelAddress, channel]) => {
            const allowedServers = channel.servers || [];
            if (allowedServers.length === 0 || allowedServers.includes(this._meta.id)) {
                channels.push(this.createModel(Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${tilde(channelAddress)}` }));
            }
        });
        return new Channels(channels);
    }
    operations() {
        const operations = [];
        this.channels().forEach(channel => {
            operations.push(...channel.operations().all());
        });
        return new Operations(operations);
    }
    messages() {
        const messages = [];
        this.operations().forEach(operation => messages.push(...operation.messages().all()));
        return new Messages(messages);
    }
    variables() {
        return new ServerVariables(Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
            return this.createModel(ServerVariable, serverVariable, {
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
                const scheme = this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
                requirements.push(this.createModel(SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` }));
            });
            return new SecurityRequirements(requirements);
        });
    }
    tags() {
        return tags(this);
    }
    bindings() {
        return bindings(this);
    }
    extensions() {
        return extensions(this);
    }
}
