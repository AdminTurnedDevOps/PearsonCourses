"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerVariable = exports.Server = void 0;
class Server {
    constructor(url, desc) {
        this.url = url;
        this.description = desc;
        this.variables = {};
    }
    addVariable(name, variable) {
        this.variables[name] = variable;
    }
}
exports.Server = Server;
class ServerVariable {
    constructor(defaultValue, enums, description) {
        this.default = defaultValue;
        this.enum = enums;
        this.description = description;
    }
}
exports.ServerVariable = ServerVariable;
