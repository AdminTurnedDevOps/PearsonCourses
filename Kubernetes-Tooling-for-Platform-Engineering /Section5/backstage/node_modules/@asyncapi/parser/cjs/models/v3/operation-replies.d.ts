import { Collection } from '../collection';
import type { OperationReplyInterface } from '../operation-reply';
import type { OperationRepliesInterface } from '../operation-replies';
export declare class OperationReplies extends Collection<OperationReplyInterface> implements OperationRepliesInterface {
    get(id: string): OperationReplyInterface | undefined;
}
