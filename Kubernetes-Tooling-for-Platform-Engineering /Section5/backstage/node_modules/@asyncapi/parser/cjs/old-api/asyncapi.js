"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAPIDocument = void 0;
const mixins_1 = require("./mixins");
const info_1 = require("./info");
const server_1 = require("./server");
const channel_1 = require("./channel");
const components_1 = require("./components");
const iterator_1 = require("./iterator");
const constants_1 = require("../constants");
const stringify_1 = require("../stringify");
class AsyncAPIDocument extends mixins_1.SpecificationExtensionsModel {
    version() {
        return this._json.asyncapi;
    }
    info() {
        return new info_1.Info(this._json.info);
    }
    id() {
        return this._json.id;
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    hasTags() {
        return mixins_1.tagsMixins.hasTags(this);
    }
    tags() {
        return mixins_1.tagsMixins.tags(this);
    }
    tagNames() {
        return mixins_1.tagsMixins.tagNames(this);
    }
    hasTag(name) {
        return mixins_1.tagsMixins.hasTag(this, name);
    }
    tag(name) {
        return mixins_1.tagsMixins.tag(this, name);
    }
    hasServers() {
        return !!this._json.servers;
    }
    servers() {
        return (0, mixins_1.createMapOfType)(this._json.servers, server_1.Server);
    }
    serverNames() {
        if (!this._json.servers)
            return [];
        return Object.keys(this._json.servers);
    }
    server(name) {
        return (0, mixins_1.getMapValue)(this._json.servers, name, server_1.Server);
    }
    hasDefaultContentType() {
        return !!this._json.defaultContentType;
    }
    defaultContentType() {
        return this._json.defaultContentType || null;
    }
    hasChannels() {
        return !!this._json.channels;
    }
    channels() {
        return (0, mixins_1.createMapOfType)(this._json.channels, channel_1.Channel);
    }
    channelNames() {
        if (!this._json.channels)
            return [];
        return Object.keys(this._json.channels);
    }
    channel(name) {
        return (0, mixins_1.getMapValue)(this._json.channels, name, channel_1.Channel);
    }
    hasComponents() {
        return !!this._json.components;
    }
    components() {
        if (!this._json.components)
            return null;
        return new components_1.Components(this._json.components);
    }
    hasMessages() {
        return !!this.allMessages().size;
    }
    allMessages() {
        const messages = new Map();
        if (this.hasChannels()) {
            this.channelNames().forEach(channelName => {
                const channel = this.channel(channelName);
                if (channel) {
                    if (channel.hasPublish()) {
                        channel.publish().messages().forEach(m => {
                            messages.set(m.uid(), m);
                        });
                    }
                    if (channel.hasSubscribe()) {
                        channel.subscribe().messages().forEach(m => {
                            messages.set(m.uid(), m);
                        });
                    }
                }
            });
        }
        if (this.hasComponents()) {
            Object.values(this.components().messages()).forEach(m => {
                messages.set(m.uid(), m);
            });
        }
        return messages;
    }
    allSchemas() {
        const schemas = new Map();
        function allSchemasCallback(schema) {
            if (schema.uid()) {
                schemas.set(schema.uid(), schema);
            }
        }
        (0, iterator_1.traverseAsyncApiDocument)(this, allSchemasCallback);
        return schemas;
    }
    hasCircular() {
        return !!this._json[constants_1.xParserCircular];
    }
    traverseSchemas(callback, schemaTypesToIterate = []) {
        (0, iterator_1.traverseAsyncApiDocument)(this, callback, schemaTypesToIterate);
    }
    static stringify(doc, space) {
        const rawDoc = doc.json();
        const copiedDoc = Object.assign({}, rawDoc);
        copiedDoc[constants_1.xParserSpecStringified] = true;
        return JSON.stringify(copiedDoc, (0, stringify_1.refReplacer)(), space);
    }
    static parse(doc) {
        let parsedJSON = doc;
        if (typeof doc === 'string') {
            parsedJSON = JSON.parse(doc);
        }
        else if (typeof doc === 'object') {
            // shall copy
            parsedJSON = Object.assign({}, parsedJSON);
        }
        // the `doc` must be an AsyncAPI parsed document
        if (typeof parsedJSON !== 'object' || !parsedJSON[constants_1.xParserSpecParsed]) {
            throw new Error('Cannot parse invalid AsyncAPI document');
        }
        // if the `doc` is not stringified via the `stringify` static method then immediately return a model.
        if (!parsedJSON[constants_1.xParserSpecStringified]) {
            return new AsyncAPIDocument(parsedJSON);
        }
        // remove `x-parser-spec-stringified` extension
        delete parsedJSON[String(constants_1.xParserSpecStringified)];
        const objToPath = new Map();
        const pathToObj = new Map();
        (0, stringify_1.traverseStringifiedData)(parsedJSON, undefined, parsedJSON, objToPath, pathToObj);
        return new AsyncAPIDocument(parsedJSON);
    }
}
exports.AsyncAPIDocument = AsyncAPIDocument;
