import { Collection } from '../collection';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
export declare class Operations extends Collection<OperationInterface> implements OperationsInterface {
    get(id: string): OperationInterface | undefined;
    filterBySend(): OperationInterface[];
    filterByReceive(): OperationInterface[];
}
