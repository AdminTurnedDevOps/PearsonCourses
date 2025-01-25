import { type prefetchOptions } from '../prefetch';
type refetchParams = any;
type prefetchReturnType<T> = [
    Promise<T>,
    (refetchParams?: refetchParams) => void
];
type UsePrefetchOptions = prefetchOptions & {
    deferId?: string;
};
export declare const usePrefetch: <T>(options: UsePrefetchOptions) => prefetchReturnType<T>;
export {};
