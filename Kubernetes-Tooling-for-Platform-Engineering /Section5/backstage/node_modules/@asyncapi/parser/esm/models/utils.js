import { SchemaTypesToIterate, traverseAsyncApiDocument } from '../iterator';
export function createModel(Model, value, meta, parent) {
    return new Model(value, Object.assign(Object.assign({}, meta), { asyncapi: meta.asyncapi || (parent === null || parent === void 0 ? void 0 : parent.meta().asyncapi) }));
}
export function schemasFromDocument(document, SchemasModel, includeComponents) {
    const jsonInstances = new Set();
    const schemas = new Set();
    function callback(schema) {
        // comparing the reference (and not just the value) to the .json() object
        if (!jsonInstances.has(schema.json())) {
            jsonInstances.add(schema.json());
            schemas.add(schema); // unique schemas 
        }
    }
    let toIterate = Object.values(SchemaTypesToIterate);
    if (!includeComponents) {
        toIterate = toIterate.filter(s => s !== SchemaTypesToIterate.Components);
    }
    traverseAsyncApiDocument(document, callback, toIterate);
    return new SchemasModel(Array.from(schemas));
}
