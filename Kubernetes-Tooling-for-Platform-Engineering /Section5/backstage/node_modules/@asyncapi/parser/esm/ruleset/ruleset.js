import { truthy, schema } from '@stoplight/spectral-functions';
import { documentStructure } from './functions/documentStructure';
import { internal } from './functions/internal';
import { isAsyncAPIDocument } from './functions/isAsyncAPIDocument';
import { unusedComponent } from './functions/unusedComponent';
import { AsyncAPIFormats } from './formats';
import { lastVersion } from '../constants';
export const coreRuleset = {
    description: 'Core AsyncAPI x.x.x ruleset.',
    formats: AsyncAPIFormats.formats(),
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
                function: isAsyncAPIDocument,
            },
        },
        'asyncapi-latest-version': {
            description: 'Checking if the AsyncAPI document is using the latest version.',
            message: `The latest version of AsyncAPi is not used. It is recommended update to the "${lastVersion}" version.`,
            recommended: true,
            severity: 'info',
            given: '$.asyncapi',
            then: {
                function: schema,
                functionOptions: {
                    schema: {
                        const: lastVersion,
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
                function: documentStructure,
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
                function: documentStructure,
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
                function: internal,
            },
        },
    },
};
export const recommendedRuleset = {
    description: 'Recommended AsyncAPI x.x.x ruleset.',
    formats: AsyncAPIFormats.filterByMajorVersions(['2']).formats(),
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
                function: truthy,
            },
        },
        'asyncapi-defaultContentType': {
            description: 'AsyncAPI document should have "defaultContentType" field.',
            recommended: true,
            given: '$',
            then: {
                field: 'defaultContentType',
                function: truthy,
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
                function: truthy,
            },
        },
        'asyncapi-info-contact': {
            description: 'Info object should have "contact" object.',
            recommended: true,
            given: '$',
            then: {
                field: 'info.contact',
                function: truthy,
            },
        },
        'asyncapi-info-contact-properties': {
            description: 'Contact object should have "name", "url" and "email" fields.',
            recommended: true,
            given: '$.info.contact',
            then: [
                {
                    field: 'name',
                    function: truthy,
                },
                {
                    field: 'url',
                    function: truthy,
                },
                {
                    field: 'email',
                    function: truthy,
                },
            ],
        },
        'asyncapi-info-license': {
            description: 'Info object should have "license" object.',
            recommended: true,
            given: '$',
            then: {
                field: 'info.license',
                function: truthy,
            },
        },
        'asyncapi-info-license-url': {
            description: 'License object should have "url" field.',
            recommended: false,
            given: '$',
            then: {
                field: 'info.license.url',
                function: truthy,
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
                function: schema,
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
            formats: AsyncAPIFormats.filterByMajorVersions(['2']).formats(),
            recommended: true,
            resolved: false,
            severity: 'info',
            given: '$',
            then: {
                function: unusedComponent,
            },
        },
    },
};
