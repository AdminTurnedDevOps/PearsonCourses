import { Collection } from '../collection';
export class Tags extends Collection {
    get(name) {
        return this.collections.find(tag => tag.name() === name);
    }
}
