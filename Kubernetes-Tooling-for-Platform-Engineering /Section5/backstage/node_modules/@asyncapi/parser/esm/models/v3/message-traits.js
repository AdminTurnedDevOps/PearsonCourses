import { Collection } from '../collection';
export class MessageTraits extends Collection {
    get(id) {
        return this.collections.find(trait => trait.id() === id);
    }
}
