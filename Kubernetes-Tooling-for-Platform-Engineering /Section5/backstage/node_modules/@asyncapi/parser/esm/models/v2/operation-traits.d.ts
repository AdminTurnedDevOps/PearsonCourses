import { Collection } from '../collection';
import type { OperationTraitsInterface } from '../operation-traits';
import type { OperationTraitInterface } from '../operation-trait';
export declare class OperationTraits extends Collection<OperationTraitInterface> implements OperationTraitsInterface {
    get(id: string): OperationTraitInterface | undefined;
}
