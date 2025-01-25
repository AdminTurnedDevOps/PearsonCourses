import { Collection } from '../collection';
export class Channels extends Collection {
    get(id) {
        return this.collections.find(channel => channel.id() === id);
    }
    filterBySend() {
        return this.filterBy(channel => channel.operations().filterBySend().length > 0);
    }
    filterByReceive() {
        return this.filterBy(channel => channel.operations().filterByReceive().length > 0);
    }
}
