"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = exports.externalDocs = exports.hasExternalDocs = exports.extensions = exports.description = exports.hasDescription = exports.bindings = void 0;
const bindings_1 = require("./bindings");
const binding_1 = require("./binding");
const extensions_1 = require("./extensions");
const extension_1 = require("./extension");
const external_docs_1 = require("./external-docs");
const tags_1 = require("./tags");
const tag_1 = require("./tag");
const utils_1 = require("../utils");
const constants_1 = require("../../constants");
function bindings(model) {
    const bindings = model.json('bindings') || {};
    return new bindings_1.Bindings(Object.entries(bindings || {}).map(([protocol, binding]) => (0, utils_1.createModel)(binding_1.Binding, binding, { protocol, pointer: model.jsonPath(`bindings/${protocol}`) }, model)), { originalData: bindings, asyncapi: model.meta('asyncapi'), pointer: model.jsonPath('bindings') });
}
exports.bindings = bindings;
function hasDescription(model) {
    return Boolean(description(model));
}
exports.hasDescription = hasDescription;
function description(model) {
    return model.json('description');
}
exports.description = description;
function extensions(model) {
    const extensions = [];
    Object.entries(model.json()).forEach(([id, value]) => {
        if (constants_1.EXTENSION_REGEX.test(id)) {
            extensions.push((0, utils_1.createModel)(extension_1.Extension, value, { id, pointer: model.jsonPath(id) }, model));
        }
    });
    return new extensions_1.Extensions(extensions);
}
exports.extensions = extensions;
function hasExternalDocs(model) {
    return Object.keys(model.json('externalDocs') || {}).length > 0;
}
exports.hasExternalDocs = hasExternalDocs;
function externalDocs(model) {
    if (hasExternalDocs(model)) {
        return new external_docs_1.ExternalDocumentation(model.json('externalDocs'));
    }
}
exports.externalDocs = externalDocs;
function tags(model) {
    return new tags_1.Tags((model.json('tags') || []).map((tag, idx) => (0, utils_1.createModel)(tag_1.Tag, tag, { pointer: model.jsonPath(`tags/${idx}`) }, model)));
}
exports.tags = tags;
