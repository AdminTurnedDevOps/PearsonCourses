import { Collection } from '../collection';
import type { CorrelationIdsInterface } from '../correlation-ids';
import type { CorrelationIdInterface } from '../correlation-id';
export declare class CorrelationIds extends Collection<CorrelationIdInterface> implements CorrelationIdsInterface {
    get(id: string): CorrelationIdInterface | undefined;
}
