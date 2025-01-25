import { Collection } from '../collection';
export class OperationTraits extends Collection {
    get(id) {
        return this.collections.find(trait => trait.id() === id);
    }
}
