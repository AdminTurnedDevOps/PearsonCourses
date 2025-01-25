import { Collection } from '../collection';
export class OperationReplies extends Collection {
    get(id) {
        return this.collections.find(reply => reply.id() === id);
    }
}
