"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncApi2SchemaParserRule = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const index_1 = require("./index");
const utils_1 = require("../utils");
function asyncApi2SchemaParserRule(parser) {
    return {
        description: 'Custom schema must be correctly formatted from the point of view of the used format.',
        message: '{{error}}',
        severity: 'error',
        recommended: true,
        given: [
            // operations
            '$.channels.*.[publish,subscribe].message',
            '$.channels.*.[publish,subscribe].message.oneOf.*',
            '$.components.channels.*.[publish,subscribe].message',
            '$.components.channels.*.[publish,subscribe].message.oneOf.*',
            // messages
            '$.components.messages.*',
        ],
        then: {
            function: rulesetFunction(parser),
        },
    };
}
exports.asyncApi2SchemaParserRule = asyncApi2SchemaParserRule;
function rulesetFunction(parser) {
    return (0, spectral_core_1.createRulesetFunction)({
        input: {
            type: 'object',
            properties: {
                schemaFormat: {
                    type: 'string',
                },
                payload: true, // any value
            }
        },
        options: null
    }, (targetVal = {}, _, ctx) => __awaiter(this, void 0, void 0, function* () {
        if (!targetVal.payload) {
            return [];
        }
        const path = [...ctx.path, 'payload'];
        const document = ctx.document;
        const parsedSpec = document.data;
        const schemaFormat = (0, index_1.getSchemaFormat)(targetVal.schemaFormat, parsedSpec.asyncapi);
        const defaultSchemaFormat = (0, index_1.getDefaultSchemaFormat)(parsedSpec.asyncapi);
        const asyncapi = (0, utils_1.createDetailedAsyncAPI)(parsedSpec, document.__parserInput, document.source || undefined);
        const input = {
            asyncapi,
            data: targetVal.payload,
            meta: {},
            path,
            schemaFormat,
            defaultSchemaFormat,
        };
        try {
            return yield (0, index_1.validateSchema)(parser, input);
        }
        catch (err) {
            return [
                {
                    message: `Error thrown during schema validation. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
                    path,
                }
            ];
        }
    }));
}
