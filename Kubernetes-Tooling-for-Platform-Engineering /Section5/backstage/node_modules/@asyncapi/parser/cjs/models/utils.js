"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemasFromDocument = exports.createModel = void 0;
const iterator_1 = require("../iterator");
function createModel(Model, value, meta, parent) {
    return new Model(value, Object.assign(Object.assign({}, meta), { asyncapi: meta.asyncapi || (parent === null || parent === void 0 ? void 0 : parent.meta().asyncapi) }));
}
exports.createModel = createModel;
function schemasFromDocument(document, SchemasModel, includeComponents) {
    const jsonInstances = new Set();
    const schemas = new Set();
    function callback(schema) {
        // comparing the reference (and not just the value) to the .json() object
        if (!jsonInstances.has(schema.json())) {
            jsonInstances.add(schema.json());
            schemas.add(schema); // unique schemas 
        }
    }
    let toIterate = Object.values(iterator_1.SchemaTypesToIterate);
    if (!includeComponents) {
        toIterate = toIterate.filter(s => s !== iterator_1.SchemaTypesToIterate.Components);
    }
    (0, iterator_1.traverseAsyncApiDocument)(document, callback, toIterate);
    return new SchemasModel(Array.from(schemas));
}
exports.schemasFromDocument = schemasFromDocument;
