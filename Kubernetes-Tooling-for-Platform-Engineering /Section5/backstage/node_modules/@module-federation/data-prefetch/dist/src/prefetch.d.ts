import { FederationHost } from '@module-federation/runtime';
import { ModuleInfo } from '@module-federation/sdk';
import { Remote } from '@module-federation/runtime/types';
declare module '@module-federation/runtime' {
    interface Federation {
        __PREFETCH__: {
            entryLoading: Record<string, undefined | Promise<void>>;
            instance: Map<string, MFDataPrefetch>;
            __PREFETCH_EXPORTS__: Record<string, () => Promise<Record<string, any>>>;
        };
    }
}
type PrefetchExports = Record<string, any>;
export interface DataPrefetchOptions {
    name: string;
    remote?: Remote;
    origin?: FederationHost;
    remoteSnapshot?: ModuleInfo;
}
export interface prefetchOptions {
    id: string;
    functionId?: string;
    cacheStrategy?: () => boolean;
    refetchParams?: any;
}
export declare class MFDataPrefetch {
    prefetchMemory: Map<string, Promise<any>>;
    recordOutdate: Record<string, Record<string, boolean>>;
    private _exports;
    private _options;
    constructor(options: DataPrefetchOptions);
    get global(): Record<string, any>;
    static getInstance(id: string): MFDataPrefetch | undefined;
    loadEntry(entry: string | undefined): Promise<any>;
    getProjectExports(): Promise<void> | Record<string, any>;
    memorizeExports(exports: Record<string, any>): void;
    getExposeExports(id: string): PrefetchExports;
    prefetch(prefetchOptions: prefetchOptions): any;
    memorize(id: string, value: any): void;
    markOutdate(markOptions: Omit<prefetchOptions, 'cacheStrategy'>, isOutdate: boolean): void;
    checkOutdate(outdateOptions: prefetchOptions): boolean;
}
export {};
