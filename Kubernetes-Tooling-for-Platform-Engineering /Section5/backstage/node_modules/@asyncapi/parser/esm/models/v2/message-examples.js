import { Collection } from '../collection';
export class MessageExamples extends Collection {
    get(name) {
        return this.collections.find(example => example.name() === name);
    }
}
