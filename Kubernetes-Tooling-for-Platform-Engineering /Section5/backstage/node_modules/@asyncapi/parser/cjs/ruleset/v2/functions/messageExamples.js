"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageExamples = exports.validate = exports.getMessageExamples = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_functions_1 = require("@stoplight/spectral-functions");
function serializeSchema(schema, type) {
    if (!schema && typeof schema !== 'boolean') { // if schema is falsy then
        if (type === 'headers') { // object for headers
            schema = { type: 'object' };
        }
        else { // anything for payload
            schema = {};
        }
    }
    else if (typeof schema === 'boolean') { // spectral cannot handle boolean schemas
        if (schema === true) {
            schema = {}; // everything
        }
        else {
            schema = { not: {} }; // nothing
        }
    }
    return schema;
}
function getMessageExamples(message) {
    var _a;
    if (!Array.isArray(message.examples)) {
        return [];
    }
    return ((_a = message.examples.map((example, index) => {
        return {
            path: ['examples', index],
            value: example,
        };
    })) !== null && _a !== void 0 ? _a : []);
}
exports.getMessageExamples = getMessageExamples;
function validate(value, path, type, schema, ctx) {
    return (0, spectral_functions_1.schema)(value, {
        allErrors: true,
        schema: schema,
    }, Object.assign(Object.assign({}, ctx), { path: [...ctx.path, ...path, type] }));
}
exports.validate = validate;
exports.messageExamples = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            summary: {
                type: 'string',
            },
        },
    },
    options: null,
}, (targetVal, _, ctx) => {
    if (!targetVal.examples)
        return;
    const results = [];
    const payloadSchema = serializeSchema(targetVal.payload, 'payload');
    const headersSchema = serializeSchema(targetVal.headers, 'headers');
    for (const example of getMessageExamples(targetVal)) {
        const { path, value } = example;
        // validate payload
        if (value.payload !== undefined) {
            const errors = validate(value.payload, path, 'payload', payloadSchema, ctx);
            if (Array.isArray(errors)) {
                results.push(...errors);
            }
        }
        // validate headers
        if (value.headers !== undefined) {
            const errors = validate(value.headers, path, 'headers', headersSchema, ctx);
            if (Array.isArray(errors)) {
                results.push(...errors);
            }
        }
    }
    return results;
});
