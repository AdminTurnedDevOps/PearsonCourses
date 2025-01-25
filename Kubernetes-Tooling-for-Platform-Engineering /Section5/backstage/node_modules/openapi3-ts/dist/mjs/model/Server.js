export class Server {
    constructor(url, desc) {
        this.url = url;
        this.description = desc;
        this.variables = {};
    }
    addVariable(name, variable) {
        this.variables[name] = variable;
    }
}
export class ServerVariable {
    constructor(defaultValue, enums, description) {
        this.default = defaultValue;
        this.enum = enums;
        this.description = description;
    }
}
