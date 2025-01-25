"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveCircularRefs = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
function resolveCircularRefs(document, inventory) {
    const documentJson = document.json();
    const ctx = { document: documentJson, hasCircular: false, inventory, visited: new Set() };
    traverse(documentJson, [], null, '', ctx);
    if (ctx.hasCircular) {
        (0, utils_1.setExtension)(constants_1.xParserCircular, true, document);
    }
}
exports.resolveCircularRefs = resolveCircularRefs;
function traverse(data, path, parent, property, ctx) {
    if (typeof data !== 'object' || !data || ctx.visited.has(data)) {
        return;
    }
    ctx.visited.add(data);
    if (Array.isArray(data)) {
        data.forEach((item, idx) => traverse(item, [...path, idx], data, idx, ctx));
    }
    if ('$ref' in data) {
        ctx.hasCircular = true;
        const resolvedRef = retrieveCircularRef(data, path, ctx);
        if (resolvedRef) {
            parent[property] = resolvedRef;
        }
    }
    else {
        for (const p in data) {
            traverse(data[p], [...path, p], data, p, ctx);
        }
    }
    ctx.visited.delete(data);
}
function retrieveCircularRef(data, path, ctx) {
    const $refPath = (0, utils_1.toJSONPathArray)(data.$ref);
    const item = ctx.inventory.findAssociatedItemForPath(path, true);
    // root document case
    if (item === null) {
        return (0, utils_1.retrieveDeepData)(ctx.document, $refPath);
    }
    // referenced document case
    if (item) {
        const subArrayIndex = (0, utils_1.findSubArrayIndex)(path, $refPath);
        let dataPath;
        if (subArrayIndex === -1) { // create subarray based on location of the assiociated document - use item.path
            dataPath = [...path.slice(0, path.length - item.path.length), ...$refPath];
        }
        else { // create subarray based on $refPath
            dataPath = path.slice(0, subArrayIndex + $refPath.length);
        }
        return (0, utils_1.retrieveDeepData)(ctx.document, dataPath);
    }
}
