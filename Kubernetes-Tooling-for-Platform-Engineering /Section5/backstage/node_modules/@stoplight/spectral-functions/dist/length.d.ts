export declare type Options = {
    min: number;
} | {
    max: number;
} | {
    min: number;
    max: number;
};
declare const _default: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string | number | unknown[] | Record<string, unknown>, Options>;
export default _default;
