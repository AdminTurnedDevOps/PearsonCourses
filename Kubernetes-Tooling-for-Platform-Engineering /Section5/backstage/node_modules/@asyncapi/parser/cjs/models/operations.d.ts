import type { Collection } from './collection';
import type { OperationInterface } from './operation';
export interface OperationsInterface extends Collection<OperationInterface> {
    filterBySend(): OperationInterface[];
    filterByReceive(): OperationInterface[];
}
