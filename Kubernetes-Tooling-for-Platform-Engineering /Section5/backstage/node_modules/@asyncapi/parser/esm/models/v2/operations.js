import { Collection } from '../collection';
export class Operations extends Collection {
    get(id) {
        return this.collections.find(operation => operation.id() === id);
    }
    filterBySend() {
        return this.filterBy(operation => operation.isSend());
    }
    filterByReceive() {
        return this.filterBy(operation => operation.isReceive());
    }
}
