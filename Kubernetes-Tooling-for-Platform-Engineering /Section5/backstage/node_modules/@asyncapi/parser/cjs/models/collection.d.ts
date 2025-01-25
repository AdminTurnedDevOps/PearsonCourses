import type { BaseModel } from './base';
import type { DetailedAsyncAPI } from '../types';
export interface CollectionMetadata<T = any> {
    originalData?: Record<string, T>;
    asyncapi?: DetailedAsyncAPI;
    pointer?: string;
}
export declare abstract class Collection<T extends BaseModel = BaseModel, M extends Record<string, any> = {}> extends Array<T> {
    protected readonly collections: T[];
    protected readonly _meta: CollectionMetadata<T> & M;
    constructor(collections: T[], _meta?: CollectionMetadata<T> & M);
    abstract get(id: string): T | undefined;
    has(id: string): boolean;
    all(): T[];
    isEmpty(): boolean;
    filterBy(filter: (item: T) => boolean): T[];
    meta(): CollectionMetadata<T> & M;
    meta<K extends keyof (CollectionMetadata<T> & M)>(key: K): (CollectionMetadata<T> & M)[K];
}
