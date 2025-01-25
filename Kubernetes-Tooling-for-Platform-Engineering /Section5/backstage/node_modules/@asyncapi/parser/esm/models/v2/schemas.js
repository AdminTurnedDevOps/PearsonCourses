import { Collection } from '../collection';
export class Schemas extends Collection {
    get(id) {
        return this.collections.find(schema => schema.id() === id);
    }
}
