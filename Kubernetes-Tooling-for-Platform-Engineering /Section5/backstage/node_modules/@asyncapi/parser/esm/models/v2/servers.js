import { Collection } from '../collection';
export class Servers extends Collection {
    get(id) {
        return this.collections.find(server => server.id() === id);
    }
    filterBySend() {
        return this.filterBy(server => server.operations().filterBySend().length > 0);
    }
    filterByReceive() {
        return this.filterBy(server => server.operations().filterByReceive().length > 0);
    }
}
