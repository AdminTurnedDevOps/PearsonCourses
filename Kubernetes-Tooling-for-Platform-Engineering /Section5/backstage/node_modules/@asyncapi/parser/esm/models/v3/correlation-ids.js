import { Collection } from '../collection';
export class CorrelationIds extends Collection {
    get(id) {
        return this.collections.find(correlationId => correlationId.meta('id') === id);
    }
}
