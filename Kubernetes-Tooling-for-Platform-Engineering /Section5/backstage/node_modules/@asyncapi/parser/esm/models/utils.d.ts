import type { BaseModel, ModelMetadata } from './base';
import type { DetailedAsyncAPI } from '../types';
import { AsyncAPIDocumentInterface } from './asyncapi';
import { SchemasInterface } from '../models';
export interface Constructor<T> extends Function {
    new (...any: any[]): T;
}
export type InferModelData<T> = T extends BaseModel<infer J> ? J : never;
export type InferModelMetadata<T> = T extends BaseModel<infer _, infer M> ? M : never;
export declare function createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & {
    asyncapi?: DetailedAsyncAPI;
} & InferModelMetadata<T>, parent?: BaseModel): T;
export declare function schemasFromDocument<T extends SchemasInterface>(document: AsyncAPIDocumentInterface, SchemasModel: Constructor<T>, includeComponents: boolean): T;
