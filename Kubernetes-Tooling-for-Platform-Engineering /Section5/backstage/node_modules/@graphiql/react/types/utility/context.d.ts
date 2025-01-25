import { Context } from 'react';
export declare function createNullableContext<T>(name: string): Context<T | null>;
export declare function createContextHook<T>(context: Context<T | null>): {
    (options: {
        nonNull: true;
        caller?: Function;
    }): T;
    (options: {
        nonNull?: boolean;
        caller?: Function;
    }): T | null;
    (): T | null;
};
