import { SpecificationExtension } from './SpecificationExtension.js';
export function getExtension(obj, extensionName) {
    if (SpecificationExtension.isValidExtension(extensionName)) {
        return obj[extensionName];
    }
    return undefined;
}
export function addExtension(obj, extensionName, extension) {
    if (SpecificationExtension.isValidExtension(extensionName)) {
        obj[extensionName] = extension;
    }
}
export function getPath(pathsObject, path) {
    if (SpecificationExtension.isValidExtension(path)) {
        return undefined;
    }
    return pathsObject[path];
}
export function isReferenceObject(obj) {
    return Object.prototype.hasOwnProperty.call(obj, '$ref');
}
export function isSchemaObject(schema) {
    return !Object.prototype.hasOwnProperty.call(schema, '$ref');
}
