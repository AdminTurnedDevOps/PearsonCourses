import { Collection } from '../collection';
export class Extensions extends Collection {
    get(id) {
        id = id.startsWith('x-') ? id : `x-${id}`;
        return this.collections.find(ext => ext.id() === id);
    }
}
