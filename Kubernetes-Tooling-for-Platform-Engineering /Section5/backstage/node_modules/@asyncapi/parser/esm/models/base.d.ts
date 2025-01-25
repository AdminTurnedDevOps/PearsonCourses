import type { Constructor, InferModelData, InferModelMetadata } from './utils';
import type { DetailedAsyncAPI } from '../types';
export interface ModelMetadata {
    asyncapi: DetailedAsyncAPI;
    pointer: string;
}
export declare abstract class BaseModel<J extends any = any, M extends Record<string, any> = {}> {
    protected readonly _json: J;
    protected readonly _meta: ModelMetadata & M;
    constructor(_json: J, _meta?: ModelMetadata & M);
    json<T = J>(): T;
    json<K extends keyof J>(key: K): J[K];
    meta(): ModelMetadata & M;
    meta<K extends keyof (ModelMetadata & M)>(key: K): (ModelMetadata & M)[K];
    jsonPath(field?: string | undefined): string;
    protected createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & InferModelMetadata<T>): T;
}
