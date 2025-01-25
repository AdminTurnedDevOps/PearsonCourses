declare const _default: {
    definitions: {
        ExternalsType: {
            description: string;
            enum: string[];
        };
        Remotes: {
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
        RemotesConfig: {
            description: string;
            type: string;
            additionalProperties: boolean;
            properties: {
                external: {
                    description: string;
                    anyOf: {
                        $ref: string;
                    }[];
                };
                shareScope: {
                    description: string;
                    type: string;
                    minLength: number;
                };
            };
            required: string[];
        };
        RemotesItem: {
            description: string;
            type: string;
            minLength: number;
        };
        RemotesItems: {
            description: string;
            type: string;
            items: {
                $ref: string;
            };
        };
        RemotesObject: {
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
        remoteType: {
            description: string;
            oneOf: {
                $ref: string;
            }[];
        };
        remotes: {
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
