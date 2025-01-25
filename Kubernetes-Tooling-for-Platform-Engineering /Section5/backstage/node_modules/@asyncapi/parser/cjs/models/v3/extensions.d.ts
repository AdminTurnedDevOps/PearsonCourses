import { Collection } from '../collection';
import type { ExtensionsInterface } from '../extensions';
import type { ExtensionInterface } from '../extension';
export declare class Extensions extends Collection<ExtensionInterface> implements ExtensionsInterface {
    get<T = any>(id: string): ExtensionInterface<T> | undefined;
}
