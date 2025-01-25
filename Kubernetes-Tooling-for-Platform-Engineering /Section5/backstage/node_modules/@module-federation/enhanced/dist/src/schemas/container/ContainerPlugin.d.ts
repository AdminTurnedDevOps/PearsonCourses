declare const _default: {
    definitions: {
        AmdContainer: {
            description: string;
            type: string;
            minLength: number;
        };
        AuxiliaryComment: {
            description: string;
            anyOf: ({
                description: string;
                type: string;
                $ref?: undefined;
            } | {
                $ref: string;
                description?: undefined;
                type?: undefined;
            })[];
        };
        EntryRuntime: {
            description: string;
            anyOf: ({
                enum: boolean[];
                type?: undefined;
                minLength?: undefined;
            } | {
                type: string;
                minLength: number;
                enum?: undefined;
            })[];
        };
        Exposes: {
            description: string;
            anyOf: ({
                type: string;
                items: {
                    description: string;
                    anyOf: {
                        $ref: string;
                    }[];
                };
                $ref?: undefined;
            } | {
                $ref: string;
                type?: undefined;
                items?: undefined;
            })[];
        };
        ExposesConfig: {
            description: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                import: {
                    description: string;
                    anyOf: {
                        $ref: string;
                    }[];
                };
                name: {
                    description: string;
                    type: string;
                };
            };
            required: string[];
        };
        ExposesItem: {
            description: string;
            type: string;
            minLength: number;
        };
        ExposesItems: {
            description: string;
            type: string;
            items: {
                $ref: string;
            };
        };
        ExposesObject: {
            description: string;
            type: string;
            additionalProperties: {
                description: string;
                anyOf: {
                    $ref: string;
                }[];
            };
        };
        LibraryCustomUmdCommentObject: {
            description: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                amd: {
                    description: string;
                    type: string;
                };
                commonjs: {
                    description: string;
                    type: string;
                };
                commonjs2: {
                    description: string;
                    type: string;
                };
                root: {
                    description: string;
                    type: string;
                };
            };
        };
        LibraryCustomUmdObject: {
            description: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                amd: {
                    description: string;
                    type: string;
                    minLength: number;
                };
                commonjs: {
                    description: string;
                    type: string;
                    minLength: number;
                };
                root: {
                    description: string;
                    anyOf: ({
                        type: string;
                        items: {
                            description: string;
                            type: string;
                            minLength: number;
                        };
                        minLength?: undefined;
                    } | {
                        type: string;
                        minLength: number;
                        items?: undefined;
                    })[];
                };
            };
        };
        LibraryExport: {
            description: string;
            anyOf: ({
                type: string;
                items: {
                    description: string;
                    type: string;
                    minLength: number;
                };
                minLength?: undefined;
            } | {
                type: string;
                minLength: number;
                items?: undefined;
            })[];
        };
        LibraryName: {
            description: string;
            anyOf: ({
                type: string;
                items: {
                    description: string;
                    type: string;
                    minLength: number;
                };
                minItems: number;
                minLength?: undefined;
                $ref?: undefined;
            } | {
                type: string;
                minLength: number;
                items?: undefined;
                minItems?: undefined;
                $ref?: undefined;
            } | {
                $ref: string;
                type?: undefined;
                items?: undefined;
                minItems?: undefined;
                minLength?: undefined;
            })[];
        };
        LibraryOptions: {
            description: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                amdContainer: {
                    $ref: string;
                };
                auxiliaryComment: {
                    $ref: string;
                };
                export: {
                    $ref: string;
                };
                name: {
                    $ref: string;
                };
                type: {
                    $ref: string;
                };
                umdNamedDefine: {
                    $ref: string;
                };
            };
            required: string[];
        };
        LibraryType: {
            description: string;
            anyOf: ({
                enum: string[];
                type?: undefined;
            } | {
                type: string;
                enum?: undefined;
            })[];
        };
        UmdNamedDefine: {
            description: string;
            type: string;
        };
    };
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        exposes: {
            $ref: string;
        };
        filename: {
            description: string;
            type: string;
            absolutePath: boolean;
            minLength: number;
        };
        library: {
            $ref: string;
        };
        name: {
            description: string;
            type: string;
            minLength: number;
        };
        runtime: {
            $ref: string;
        };
        runtimePlugins: {
            type: string;
            items: {
                anyOf: ({
                    type: string;
                    minLength: number;
                    description: string;
                    required?: undefined;
                    properties?: undefined;
                    additionalProperties?: undefined;
                } | {
                    type: string;
                    required: string[];
                    properties: {
                        import: {
                            type: string;
                            minLength: number;
                            description: string;
                        };
                        async: {
                            type: string;
                        };
                    };
                    additionalProperties: boolean;
                    minLength?: undefined;
                    description?: undefined;
                })[];
            };
        };
        shareScope: {
            description: string;
            type: string;
            minLength: number;
        };
        experiments: {
            type: string;
            properties: {
                federationRuntime: {
                    anyOf: ({
                        type: string;
                        enum?: undefined;
                    } | {
                        enum: string[];
                        type?: undefined;
                    })[];
                };
            };
            additionalProperties: boolean;
        };
    };
    required: string[];
};
export default _default;
