export declare type Sink<TValue = unknown, TError = unknown> = {
    next: (value: TValue) => void;
    error: (error: TError) => void;
    complete: () => void;
};
