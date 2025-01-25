declare const _default: {
    definitions: {
        Provides: {
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
        ProvidesConfig: {
            description: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                eager: {
                    description: string;
                    type: string;
                };
                requiredVersion: {
                    description: string;
                    anyOf: ({
                        description: string;
                        enum: boolean[];
                        type?: undefined;
                    } | {
                        description: string;
                        type: string;
                        enum?: undefined;
                    })[];
                };
                shareKey: {
                    description: string;
                    type: string;
                    minLength: number;
                };
                shareScope: {
                    description: string;
                    type: string;
                    minLength: number;
                };
                singleton: {
                    description: string;
                    type: string;
                };
                strictVersion: {
                    description: string;
                    type: string;
                };
                version: {
                    description: string;
                    anyOf: ({
                        description: string;
                        enum: boolean[];
                        type?: undefined;
                    } | {
                        description: string;
                        type: string;
                        enum?: undefined;
                    })[];
                };
            };
        };
        ProvidesItem: {
            description: string;
            type: string;
            minLength: number;
        };
        ProvidesObject: {
            description: string;
            type: string;
            additionalProperties: {
                description: string;
                anyOf: {
                    $ref: string;
                }[];
            };
        };
    };
    title: string;
    type: string;
    additionalProperties: boolean;
    properties: {
        provides: {
            $ref: string;
        };
        shareScope: {
            description: string;
            type: string;
            minLength: number;
        };
    };
    required: string[];
};
export default _default;
