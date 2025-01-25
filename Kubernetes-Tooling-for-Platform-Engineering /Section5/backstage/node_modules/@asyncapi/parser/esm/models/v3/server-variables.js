import { Collection } from '../collection';
export class ServerVariables extends Collection {
    get(id) {
        return this.collections.find(variable => variable.id() === id);
    }
}
