import { Collection } from '../collection';
export class ChannelParameters extends Collection {
    get(id) {
        return this.collections.find(parameter => parameter.id() === id);
    }
}
