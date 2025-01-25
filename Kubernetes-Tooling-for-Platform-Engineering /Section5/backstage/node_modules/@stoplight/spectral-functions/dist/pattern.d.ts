export declare type Options = {
    match: string;
} | {
    notMatch: string;
} | {
    match: string;
    notMatch: string;
};
declare const _default: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, Options>;
export default _default;
