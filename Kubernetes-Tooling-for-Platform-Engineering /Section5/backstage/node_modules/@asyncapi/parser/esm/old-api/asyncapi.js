import { SpecificationExtensionsModel, hasExternalDocs, externalDocs, tagsMixins, createMapOfType, getMapValue } from './mixins';
import { Info } from './info';
import { Server } from './server';
import { Channel } from './channel';
import { Components } from './components';
import { traverseAsyncApiDocument } from './iterator';
import { xParserCircular, xParserSpecStringified, xParserSpecParsed } from '../constants';
import { refReplacer, traverseStringifiedData } from '../stringify';
export class AsyncAPIDocument extends SpecificationExtensionsModel {
    version() {
        return this._json.asyncapi;
    }
    info() {
        return new Info(this._json.info);
    }
    id() {
        return this._json.id;
    }
    externalDocs() {
        return externalDocs(this);
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
    hasTags() {
        return tagsMixins.hasTags(this);
    }
    tags() {
        return tagsMixins.tags(this);
    }
    tagNames() {
        return tagsMixins.tagNames(this);
    }
    hasTag(name) {
        return tagsMixins.hasTag(this, name);
    }
    tag(name) {
        return tagsMixins.tag(this, name);
    }
    hasServers() {
        return !!this._json.servers;
    }
    servers() {
        return createMapOfType(this._json.servers, Server);
    }
    serverNames() {
        if (!this._json.servers)
            return [];
        return Object.keys(this._json.servers);
    }
    server(name) {
        return getMapValue(this._json.servers, name, Server);
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
        return createMapOfType(this._json.channels, Channel);
    }
    channelNames() {
        if (!this._json.channels)
            return [];
        return Object.keys(this._json.channels);
    }
    channel(name) {
        return getMapValue(this._json.channels, name, Channel);
    }
    hasComponents() {
        return !!this._json.components;
    }
    components() {
        if (!this._json.components)
            return null;
        return new Components(this._json.components);
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
        traverseAsyncApiDocument(this, allSchemasCallback);
        return schemas;
    }
    hasCircular() {
        return !!this._json[xParserCircular];
    }
    traverseSchemas(callback, schemaTypesToIterate = []) {
        traverseAsyncApiDocument(this, callback, schemaTypesToIterate);
    }
    static stringify(doc, space) {
        const rawDoc = doc.json();
        const copiedDoc = Object.assign({}, rawDoc);
        copiedDoc[xParserSpecStringified] = true;
        return JSON.stringify(copiedDoc, refReplacer(), space);
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
        if (typeof parsedJSON !== 'object' || !parsedJSON[xParserSpecParsed]) {
            throw new Error('Cannot parse invalid AsyncAPI document');
        }
        // if the `doc` is not stringified via the `stringify` static method then immediately return a model.
        if (!parsedJSON[xParserSpecStringified]) {
            return new AsyncAPIDocument(parsedJSON);
        }
        // remove `x-parser-spec-stringified` extension
        delete parsedJSON[String(xParserSpecStringified)];
        const objToPath = new Map();
        const pathToObj = new Map();
        traverseStringifiedData(parsedJSON, undefined, parsedJSON, objToPath, pathToObj);
        return new AsyncAPIDocument(parsedJSON);
    }
}
