"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servers = exports.server1 = exports.ServerConfiguration = void 0;
const http_1 = require("./http/http");
/**
 *
 * Represents the configuration of a server including its
 * url template and variable configuration based on the url.
 *
 */
class ServerConfiguration {
    constructor(url, variableConfiguration) {
        this.url = url;
        this.variableConfiguration = variableConfiguration;
    }
    /**
     * Sets the value of the variables of this server. Variables are included in
     * the `url` of this ServerConfiguration in the form `{variableName}`
     *
     * @param variableConfiguration a partial variable configuration for the
     * variables contained in the url
     */
    setVariables(variableConfiguration) {
        Object.assign(this.variableConfiguration, variableConfiguration);
    }
    getConfiguration() {
        return this.variableConfiguration;
    }
    getUrl() {
        let replacedUrl = this.url;
        for (const key in this.variableConfiguration) {
            var re = new RegExp("{" + key + "}", "g");
            replacedUrl = replacedUrl.replace(re, this.variableConfiguration[key]);
        }
        return replacedUrl;
    }
    /**
     * Creates a new request context for this server using the url with variables
     * replaced with their respective values and the endpoint of the request appended.
     *
     * @param endpoint the endpoint to be queried on the server
     * @param httpMethod httpMethod to be used
     *
     */
    makeRequestContext(endpoint, httpMethod) {
        return new http_1.RequestContext(this.getUrl() + endpoint, httpMethod);
    }
}
exports.ServerConfiguration = ServerConfiguration;
exports.server1 = new ServerConfiguration("", {});
exports.servers = [exports.server1];
//# sourceMappingURL=servers.js.map