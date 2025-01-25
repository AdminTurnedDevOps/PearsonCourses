export declare function isAggregateError(maybeAggregateError: unknown): maybeAggregateError is Error & {
    errors: unknown[];
};
