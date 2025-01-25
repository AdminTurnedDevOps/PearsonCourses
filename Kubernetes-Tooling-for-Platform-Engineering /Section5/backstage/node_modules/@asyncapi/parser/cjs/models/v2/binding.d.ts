import { BaseModel } from '../base';
import type { BindingInterface } from '../binding';
import type { ExtensionsInterface } from '../extensions';
import type { v2 } from '../../spec-types';
export declare class Binding<T extends Record<string, any> = Record<string, any>> extends BaseModel<v2.Binding & T, {
    protocol: string;
}> implements BindingInterface<T> {
    protocol(): string;
    version(): string;
    value<V = T>(): V;
    extensions(): ExtensionsInterface;
}
