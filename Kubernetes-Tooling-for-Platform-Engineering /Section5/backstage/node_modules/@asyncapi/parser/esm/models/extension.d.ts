import type { BaseModel } from './base';
export interface ExtensionInterface<T = any> extends BaseModel {
    id(): string;
    value<V = T>(): V;
}
