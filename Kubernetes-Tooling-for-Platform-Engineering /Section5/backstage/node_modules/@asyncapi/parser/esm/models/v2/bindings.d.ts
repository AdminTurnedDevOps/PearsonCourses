import { Collection } from '../collection';
import type { BindingsInterface } from '../bindings';
import type { BindingInterface } from '../binding';
import type { ExtensionsInterface } from '../extensions';
export declare class Bindings extends Collection<BindingInterface> implements BindingsInterface {
    get<T extends Record<string, any> = Record<string, any>>(name: string): BindingInterface<T> | undefined;
    extensions(): ExtensionsInterface;
}
