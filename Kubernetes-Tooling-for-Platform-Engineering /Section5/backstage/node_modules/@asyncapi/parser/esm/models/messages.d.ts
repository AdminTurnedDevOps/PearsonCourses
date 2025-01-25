import type { Collection } from './collection';
import type { MessageInterface } from './message';
export interface MessagesInterface extends Collection<MessageInterface> {
    filterBySend(): MessageInterface[];
    filterByReceive(): MessageInterface[];
}
