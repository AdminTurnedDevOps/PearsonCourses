import { Collection } from '../collection';
import type { MessageExamplesInterface } from '../message-examples';
import type { MessageExampleInterface } from '../message-example';
export declare class MessageExamples extends Collection<MessageExampleInterface> implements MessageExamplesInterface {
    get(name: string): MessageExampleInterface | undefined;
}
