var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createRulesetFunction } from '@stoplight/spectral-core';
import { getDefaultSchemaFormat, getSchemaFormat, parseSchema } from '../../../schema-parser';
import { createDetailedAsyncAPI } from '../../../utils';
import { getMessageExamples, validate } from './messageExamples';
export function asyncApi2MessageExamplesParserRule(parser) {
    return {
        description: 'Examples of message object should validate against a payload with an explicit schemaFormat.',
        message: '{{error}}',
        severity: 'error',
        recommended: true,
        given: [
            // messages
            '$.channels.*.[publish,subscribe][?(@property === \'message\' && @.schemaFormat !== void 0)]',
            '$.channels.*.[publish,subscribe].message.oneOf[?(!@null && @.schemaFormat !== void 0)]',
            '$.components.channels.*.[publish,subscribe].message[?(@property === \'message\' && @.schemaFormat !== void 0)]',
            '$.components.channels.*.[publish,subscribe].message.oneOf[?(!@null && @.schemaFormat !== void 0)]',
            '$.components.messages[?(!@null && @.schemaFormat !== void 0)]',
            // message traits
            '$.channels.*.[publish,subscribe].message.traits[?(!@null && @.schemaFormat !== void 0)]',
            '$.channels.*.[publish,subscribe].message.oneOf.*.traits[?(!@null && @.schemaFormat !== void 0)]',
            '$.components.channels.*.[publish,subscribe].message.traits[?(!@null && @.schemaFormat !== void 0)]',
            '$.components.channels.*.[publish,subscribe].message.oneOf.*.traits[?(!@null && @.schemaFormat !== void 0)]',
            '$.components.messages.*.traits[?(!@null && @.schemaFormat !== void 0)]',
            '$.components.messageTraits[?(!@null && @.schemaFormat !== void 0)]',
        ],
        then: {
            function: rulesetFunction(parser),
        },
    };
}
function rulesetFunction(parser) {
    return createRulesetFunction({
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
    }, (targetVal, _, ctx) => __awaiter(this, void 0, void 0, function* () {
        if (!targetVal.examples)
            return;
        if (!targetVal.payload)
            return;
        const document = ctx.document;
        const parsedSpec = document.data;
        const schemaFormat = getSchemaFormat(targetVal.schemaFormat, parsedSpec.asyncapi);
        const defaultSchemaFormat = getDefaultSchemaFormat(parsedSpec.asyncapi);
        const asyncapi = createDetailedAsyncAPI(parsedSpec, document.__parserInput, document.source || undefined);
        const input = {
            asyncapi,
            rootPath: ctx.path,
            schemaFormat,
            defaultSchemaFormat
        };
        const results = [];
        const payloadSchemaResults = yield parseExampleSchema(parser, targetVal.payload, input);
        const payloadSchema = payloadSchemaResults.schema;
        results.push(...payloadSchemaResults.errors);
        for (const example of getMessageExamples(targetVal)) {
            const { path, value } = example;
            // validate payload
            if (value.payload !== undefined && payloadSchema !== undefined) {
                const errors = validate(value.payload, path, 'payload', payloadSchema, ctx);
                if (Array.isArray(errors)) {
                    results.push(...errors);
                }
            }
        }
        return results;
    }));
}
function parseExampleSchema(parser, schema, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = [...input.rootPath, 'payload'];
        if (schema === undefined) {
            return { path, schema: undefined, errors: [] };
        }
        try {
            const parseSchemaInput = {
                asyncapi: input.asyncapi,
                data: schema,
                meta: {},
                path,
                schemaFormat: input.schemaFormat,
                defaultSchemaFormat: input.defaultSchemaFormat,
            };
            const parsedSchema = yield parseSchema(parser, parseSchemaInput);
            return { path, schema: parsedSchema, errors: [] };
        }
        catch (err) {
            const error = {
                message: `Error thrown during schema validation. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
                path
            };
            return { path, schema: undefined, errors: [error] };
        }
    });
}
