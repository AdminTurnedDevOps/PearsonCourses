export declare function validateAlias(ruleset: {
    aliases?: Record<string, unknown>;
    overrides?: Record<string, unknown>;
}, alias: string, path: string): Error | void;
