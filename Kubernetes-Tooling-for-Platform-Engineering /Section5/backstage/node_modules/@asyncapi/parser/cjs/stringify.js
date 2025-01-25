"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseStringifiedData = exports.refReplacer = exports.copy = exports.unstringify = exports.stringify = void 0;
const document_1 = require("./document");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
function stringify(document, options = {}) {
    if ((0, document_1.isAsyncAPIDocument)(document)) {
        document = document.json();
    }
    else if ((0, document_1.isParsedDocument)(document)) {
        if ((0, document_1.isStringifiedDocument)(document)) {
            return JSON.stringify(document);
        }
    }
    else {
        return;
    }
    return JSON.stringify(Object.assign(Object.assign({}, document), { [String(constants_1.xParserSpecStringified)]: true }), refReplacer(), options.space || 2);
}
exports.stringify = stringify;
function unstringify(document) {
    let parsed = document;
    if (typeof document === 'string') {
        try {
            parsed = JSON.parse(document);
        }
        catch (_) {
            return;
        }
    }
    if (!(0, document_1.isStringifiedDocument)(parsed)) {
        return;
    }
    // shall copy of whole JSON
    parsed = Object.assign({}, parsed);
    // remove `x-parser-spec-stringified` extension
    delete parsed[String(constants_1.xParserSpecStringified)];
    traverseStringifiedData(document, undefined, document, new Map(), new Map());
    return (0, document_1.createAsyncAPIDocument)((0, utils_1.createDetailedAsyncAPI)(parsed, document));
}
exports.unstringify = unstringify;
function copy(data) {
    const stringifiedData = JSON.stringify(data, refReplacer());
    const unstringifiedData = JSON.parse(stringifiedData);
    traverseStringifiedData(unstringifiedData, undefined, unstringifiedData, new Map(), new Map());
    return unstringifiedData;
}
exports.copy = copy;
function refReplacer() {
    const modelPaths = new Map();
    const paths = new Map();
    let init = null;
    return function (field, value) {
        // `this` points to parent object of given value - some object or array
        const pathPart = modelPaths.get(this) + (Array.isArray(this) ? `[${field}]` : `.${field}`);
        // check if `objOrPath` has "reference"
        const isComplex = value === Object(value);
        if (isComplex) {
            modelPaths.set(value, pathPart);
        }
        const savedPath = paths.get(value) || '';
        if (!savedPath && isComplex) {
            const valuePath = pathPart.replace(/undefined\.\.?/, '');
            paths.set(value, valuePath);
        }
        const prefixPath = savedPath[0] === '[' ? '$' : '$.';
        let val = savedPath ? `$ref:${prefixPath}${savedPath}` : value;
        if (init === null) {
            init = value;
        }
        else if (val === init) {
            val = '$ref:$';
        }
        return val;
    };
}
exports.refReplacer = refReplacer;
const refRoot = '$ref:$';
function traverseStringifiedData(parent, field, root, objToPath, pathToObj) {
    let objOrPath = parent;
    let path = refRoot;
    if (field !== undefined) {
        // here can be string with `$ref` prefix or normal value 
        objOrPath = parent[String(field)];
        const concatenatedPath = field ? `.${field}` : '';
        path = objToPath.get(parent) + (Array.isArray(parent) ? `[${field}]` : concatenatedPath);
    }
    objToPath.set(objOrPath, path);
    pathToObj.set(path, objOrPath);
    const ref = pathToObj.get(objOrPath);
    if (ref) {
        parent[String(field)] = ref;
    }
    if (objOrPath === refRoot || ref === refRoot) {
        parent[String(field)] = root;
    }
    // traverse all keys, only if object is array/object
    if (objOrPath === Object(objOrPath)) {
        for (const f in objOrPath) {
            traverseStringifiedData(objOrPath, f, root, objToPath, pathToObj);
        }
    }
}
exports.traverseStringifiedData = traverseStringifiedData;
