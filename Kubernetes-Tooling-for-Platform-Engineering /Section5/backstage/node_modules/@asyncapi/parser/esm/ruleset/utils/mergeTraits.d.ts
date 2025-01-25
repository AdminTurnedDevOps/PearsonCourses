export type MaybeHaveTraits = {
    traits?: any[];
} & Record<string, unknown>;
export declare function mergeTraits<T extends MaybeHaveTraits>(data: T): T;
