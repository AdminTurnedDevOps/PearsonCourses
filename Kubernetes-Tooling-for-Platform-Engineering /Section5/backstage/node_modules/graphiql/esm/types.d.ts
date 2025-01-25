export declare type Maybe<T> = T | null | undefined;
export declare type ReactComponentLike = string | ((props: any, context?: any) => any) | (new (props: any, context?: any) => any);
export declare type ReactElementLike = {
    type: ReactComponentLike;
    props: any;
    key: string | number | null;
};
export declare type ReactNodeLike = {} | ReactElementLike | Array<ReactNodeLike> | string | number | boolean | null | undefined;
//# sourceMappingURL=types.d.ts.map