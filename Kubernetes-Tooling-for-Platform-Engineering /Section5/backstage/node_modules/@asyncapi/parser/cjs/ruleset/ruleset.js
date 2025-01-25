"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendedRuleset = exports.coreRuleset = void 0;
const spectral_functions_1 = require("@stoplight/spectral-functions");
const documentStructure_1 = require("./functions/documentStructure");
const internal_1 = require("./functions/internal");
const isAsyncAPIDocument_1 = require("./functions/isAsyncAPIDocument");
const unusedComponent_1 = require("./functions/unusedComponent");
const formats_1 = require("./formats");
const constants_1 = require("../constants");
exports.coreRuleset = {
    description: 'Core AsyncAPI x.x.x ruleset.',
    formats: formats_1.AsyncAPIFormats.formats(),
    rules: {
        /**
         * Root Object rules
         */
        'asyncapi-is-asyncapi': {
            description: 'The input must be a document with a supported version of AsyncAPI.',
            formats: [() => true],
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            given: '$',
            then: {
                function: isAsyncAPIDocument_1.isAsyncAPIDocument,
            },
        },
        'asyncapi-latest-version': {
            description: 'Checking if the AsyncAPI document is using the latest version.',
            message: `The latest version of AsyncAPi is not used. It is recommended update to the "${constants_1.lastVersion}" version.`,
            recommended: true,
            severity: 'info',
            given: '$.asyncapi',
            then: {
                function: spectral_functions_1.schema,
                functionOptions: {
                    schema: {
                        const: constants_1.lastVersion,
                    },
                },
            },
        },
        'asyncapi-document-resolved': {
            description: 'Checking if the AsyncAPI document has valid resolved structure.',
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            given: '$',
            then: {
                function: documentStructure_1.documentStructure,
                functionOptions: {
                    resolved: true,
                },
            },
        },
        'asyncapi-document-unresolved': {
            description: 'Checking if the AsyncAPI document has valid unresolved structure.',
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            resolved: false,
            given: '$',
            then: {
                function: documentStructure_1.documentStructure,
                functionOptions: {
                    resolved: false,
                },
            },
        },
        'asyncapi-internal': {
            description: 'That rule is internal to extend Spectral functionality for Parser purposes.',
            recommended: true,
            given: '$',
            then: {
                function: internal_1.internal,
            },
        },
    },
};
exports.recommendedRuleset = {
    description: 'Recommended AsyncAPI x.x.x ruleset.',
    formats: formats_1.AsyncAPIFormats.filterByMajorVersions(['2']).formats(),
    rules: {
        /**
         * Root Object rules
         */
        'asyncapi-id': {
            description: 'AsyncAPI document should have "id" field.',
            recommended: true,
            given: '$',
            then: {
                field: 'id',
                function: spectral_functions_1.truthy,
            },
        },
        'asyncapi-defaultContentType': {
            description: 'AsyncAPI document should have "defaultContentType" field.',
            recommended: true,
            given: '$',
            then: {
                field: 'defaultContentType',
                function: spectral_functions_1.truthy,
            },
        },
        /**
         * Info Object rules
         */
        'asyncapi-info-description': {
            description: 'Info "description" should be present and non-empty string.',
            recommended: true,
            given: '$',
            then: {
                field: 'info.description',
                function: spectral_functions_1.truthy,
            },
        },
        'asyncapi-info-contact': {
            description: 'Info object should have "contact" object.',
            recommended: true,
            given: '$',
            then: {
                field: 'info.contact',
                function: spectral_functions_1.truthy,
            },
        },
        'asyncapi-info-contact-properties': {
            description: 'Contact object should have "name", "url" and "email" fields.',
            recommended: true,
            given: '$.info.contact',
            then: [
                {
                    field: 'name',
                    function: spectral_functions_1.truthy,
                },
                {
                    field: 'url',
                    function: spectral_functions_1.truthy,
                },
                {
                    field: 'email',
                    function: spectral_functions_1.truthy,
                },
            ],
        },
        'asyncapi-info-license': {
            description: 'Info object should have "license" object.',
            recommended: true,
            given: '$',
            then: {
                field: 'info.license',
                function: spectral_functions_1.truthy,
            },
        },
        'asyncapi-info-license-url': {
            description: 'License object should have "url" field.',
            recommended: false,
            given: '$',
            then: {
                field: 'info.license.url',
                function: spectral_functions_1.truthy,
            },
        },
        /**
         * Server Object rules
         */
        'asyncapi-servers': {
            description: 'AsyncAPI document should have non-empty "servers" object.',
            recommended: true,
            given: '$',
            then: {
                field: 'servers',
                function: spectral_functions_1.schema,
                functionOptions: {
                    schema: {
                        type: 'object',
                        minProperties: 1,
                    },
                    allErrors: true,
                },
            },
        },
        /**
         * Component Object rules
         */
        'asyncapi-unused-component': {
            description: 'Potentially unused component has been detected in AsyncAPI document.',
            formats: formats_1.AsyncAPIFormats.filterByMajorVersions(['2']).formats(),
            recommended: true,
            resolved: false,
            severity: 'info',
            given: '$',
            then: {
                function: unusedComponent_1.unusedComponent,
            },
        },
    },
};
