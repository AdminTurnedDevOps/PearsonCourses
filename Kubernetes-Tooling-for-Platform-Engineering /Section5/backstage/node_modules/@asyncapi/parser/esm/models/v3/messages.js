import { Collection } from '../collection';
export class Messages extends Collection {
    get(name) {
        return this.collections.find(message => message.id() === name);
    }
    filterBySend() {
        return this.filterBy(message => message.operations().filterBySend().length > 0);
    }
    filterByReceive() {
        return this.filterBy(message => message.operations().filterByReceive().length > 0);
    }
}
