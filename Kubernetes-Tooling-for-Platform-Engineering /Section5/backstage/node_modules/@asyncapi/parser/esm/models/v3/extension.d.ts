import { BaseModel } from '../base';
import type { ExtensionInterface } from '../extension';
import type { v3 } from '../../spec-types';
export declare class Extension<T = any> extends BaseModel<v3.SpecificationExtension<T>, {
    id: string;
}> implements ExtensionInterface<T> {
    id(): string;
    version(): string;
    value<V = T>(): V;
}
