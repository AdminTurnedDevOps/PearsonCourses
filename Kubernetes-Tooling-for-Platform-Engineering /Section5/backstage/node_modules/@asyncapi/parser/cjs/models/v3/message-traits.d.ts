import { Collection } from '../collection';
import type { MessageTraitsInterface } from '../message-traits';
import type { MessageTraitInterface } from '../message-trait';
export declare class MessageTraits extends Collection<MessageTraitInterface> implements MessageTraitsInterface {
    get(id: string): MessageTraitInterface | undefined;
}
