export declare const channelServers: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
    servers?: Record<string, unknown> | undefined;
    channels?: Record<string, {
        servers?: string[] | undefined;
    }> | undefined;
}, null>;
