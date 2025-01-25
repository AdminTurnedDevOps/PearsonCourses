export declare const coreRuleset: {
    description: string;
    formats: import("@stoplight/spectral-core").Format<void>[];
    rules: {
        /**
         * Root Object rules
         */
        'asyncapi-is-asyncapi': {
            description: string;
            formats: (() => boolean)[];
            message: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../types").MaybeAsyncAPI, null>;
            };
        };
        'asyncapi-latest-version': {
            description: string;
            message: string;
            recommended: boolean;
            severity: string;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, import("@stoplight/spectral-functions").SchemaOptions>;
                functionOptions: {
                    schema: {
                        const: string;
                    };
                };
            };
        };
        'asyncapi-document-resolved': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, {
                    resolved: boolean;
                }>;
                functionOptions: {
                    resolved: boolean;
                };
            };
        };
        'asyncapi-document-unresolved': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            resolved: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, {
                    resolved: boolean;
                }>;
                functionOptions: {
                    resolved: boolean;
                };
            };
        };
        'asyncapi-internal': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<null, null>;
            };
        };
    };
};
export declare const recommendedRuleset: {
    description: string;
    formats: import("@stoplight/spectral-core").Format<void>[];
    rules: {
        /**
         * Root Object rules
         */
        'asyncapi-id': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        'asyncapi-defaultContentType': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        /**
         * Info Object rules
         */
        'asyncapi-info-description': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        'asyncapi-info-contact': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        'asyncapi-info-contact-properties': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            }[];
        };
        'asyncapi-info-license': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        'asyncapi-info-license-url': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        /**
         * Server Object rules
         */
        'asyncapi-servers': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, import("@stoplight/spectral-functions").SchemaOptions>;
                functionOptions: {
                    schema: {
                        type: string;
                        minProperties: number;
                    };
                    allErrors: boolean;
                };
            };
        };
        /**
         * Component Object rules
         */
        'asyncapi-unused-component': {
            description: string;
            formats: import("@stoplight/spectral-core").Format<void>[];
            recommended: boolean;
            resolved: boolean;
            severity: string;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    components: Record<string, unknown>;
                }, null>;
            };
        };
    };
};
