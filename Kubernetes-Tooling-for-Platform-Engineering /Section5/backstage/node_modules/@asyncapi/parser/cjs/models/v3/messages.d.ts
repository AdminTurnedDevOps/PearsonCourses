import { Collection } from '../collection';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
export declare class Messages extends Collection<MessageInterface> implements MessagesInterface {
    get(name: string): MessageInterface | undefined;
    filterBySend(): MessageInterface[];
    filterByReceive(): MessageInterface[];
}
