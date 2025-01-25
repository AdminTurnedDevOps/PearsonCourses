import { BaseModel } from '../base';
import type { ExtensionInterface } from '../extension';
import type { v2 } from '../../spec-types';
export declare class Extension<T = any> extends BaseModel<v2.SpecificationExtension<T>, {
    id: string;
}> implements ExtensionInterface<T> {
    id(): string;
    value<V = T>(): V;
}
