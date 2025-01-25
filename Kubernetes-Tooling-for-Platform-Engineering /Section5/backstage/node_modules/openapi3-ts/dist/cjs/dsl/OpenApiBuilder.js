"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiBuilder = void 0;
const yaml = require("yaml");
class OpenApiBuilder {
    static create(doc) {
        return new OpenApiBuilder(doc);
    }
    constructor(doc) {
        this.rootDoc = doc || {
            openapi: '3.0.0',
            info: {
                title: 'app',
                version: 'version'
            },
            paths: {},
            components: {
                schemas: {},
                responses: {},
                parameters: {},
                examples: {},
                requestBodies: {},
                headers: {},
                securitySchemes: {},
                links: {},
                callbacks: {}
            },
            tags: [],
            servers: []
        };
    }
    getSpec() {
        return this.rootDoc;
    }
    getSpecAsJson(replacer, space) {
        return JSON.stringify(this.rootDoc, replacer, space);
    }
    getSpecAsYaml() {
        return yaml.stringify(this.rootDoc);
    }
    static isValidOpenApiVersion(v) {
        v = v || '';
        const match = /(\d+)\.(\d+).(\d+)/.exec(v);
        if (match) {
            const major = parseInt(match[1], 10);
            if (major >= 3) {
                return true;
            }
        }
        return false;
    }
    addOpenApiVersion(openApiVersion) {
        if (!OpenApiBuilder.isValidOpenApiVersion(openApiVersion)) {
            throw new Error('Invalid OpenApi version: ' + openApiVersion + '. Follow convention: 3.x.y');
        }
        this.rootDoc.openapi = openApiVersion;
        return this;
    }
    addInfo(info) {
        this.rootDoc.info = info;
        return this;
    }
    addContact(contact) {
        this.rootDoc.info.contact = contact;
        return this;
    }
    addLicense(license) {
        this.rootDoc.info.license = license;
        return this;
    }
    addTitle(title) {
        this.rootDoc.info.title = title;
        return this;
    }
    addDescription(description) {
        this.rootDoc.info.description = description;
        return this;
    }
    addTermsOfService(termsOfService) {
        this.rootDoc.info.termsOfService = termsOfService;
        return this;
    }
    addVersion(version) {
        this.rootDoc.info.version = version;
        return this;
    }
    addPath(path, pathItem) {
        this.rootDoc.paths[path] = Object.assign(Object.assign({}, this.rootDoc.paths[path] || {}), pathItem);
        return this;
    }
    addSchema(name, schema) {
        this.rootDoc.components.schemas[name] = schema;
        return this;
    }
    addResponse(name, response) {
        this.rootDoc.components.responses[name] = response;
        return this;
    }
    addParameter(name, parameter) {
        this.rootDoc.components.parameters[name] = parameter;
        return this;
    }
    addExample(name, example) {
        this.rootDoc.components.examples[name] = example;
        return this;
    }
    addRequestBody(name, reqBody) {
        this.rootDoc.components.requestBodies[name] = reqBody;
        return this;
    }
    addHeader(name, header) {
        this.rootDoc.components.headers[name] = header;
        return this;
    }
    addSecurityScheme(name, secScheme) {
        this.rootDoc.components.securitySchemes[name] = secScheme;
        return this;
    }
    addLink(name, link) {
        this.rootDoc.components.links[name] = link;
        return this;
    }
    addCallback(name, callback) {
        this.rootDoc.components.callbacks[name] = callback;
        return this;
    }
    addServer(server) {
        this.rootDoc.servers.push(server);
        return this;
    }
    addTag(tag) {
        this.rootDoc.tags.push(tag);
        return this;
    }
    addExternalDocs(extDoc) {
        this.rootDoc.externalDocs = extDoc;
        return this;
    }
    addWebhook(webhook, webhookItem) {
        var _a;
        var _b;
        (_a = (_b = this.rootDoc).webhooks) !== null && _a !== void 0 ? _a : (_b.webhooks = {});
        this.rootDoc.webhooks[webhook] = webhookItem;
        return this;
    }
}
exports.OpenApiBuilder = OpenApiBuilder;
