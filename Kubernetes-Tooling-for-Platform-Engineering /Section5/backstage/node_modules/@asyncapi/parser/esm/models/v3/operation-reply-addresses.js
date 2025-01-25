import { Collection } from '../collection';
export class OperationReplyAddresses extends Collection {
    get(id) {
        return this.collections.find(reply => reply.id() === id);
    }
}
