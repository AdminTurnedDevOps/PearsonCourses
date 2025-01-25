"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSchemaObject = exports.isReferenceObject = exports.getPath = exports.addExtension = exports.getExtension = void 0;
const SpecificationExtension_js_1 = require("./SpecificationExtension.js");
function getExtension(obj, extensionName) {
    if (SpecificationExtension_js_1.SpecificationExtension.isValidExtension(extensionName)) {
        return obj[extensionName];
    }
    return undefined;
}
exports.getExtension = getExtension;
function addExtension(obj, extensionName, extension) {
    if (SpecificationExtension_js_1.SpecificationExtension.isValidExtension(extensionName)) {
        obj[extensionName] = extension;
    }
}
exports.addExtension = addExtension;
function getPath(pathsObject, path) {
    if (SpecificationExtension_js_1.SpecificationExtension.isValidExtension(path)) {
        return undefined;
    }
    return pathsObject[path];
}
exports.getPath = getPath;
function isReferenceObject(obj) {
    return Object.prototype.hasOwnProperty.call(obj, '$ref');
}
exports.isReferenceObject = isReferenceObject;
function isSchemaObject(schema) {
    return !Object.prototype.hasOwnProperty.call(schema, '$ref');
}
exports.isSchemaObject = isSchemaObject;
