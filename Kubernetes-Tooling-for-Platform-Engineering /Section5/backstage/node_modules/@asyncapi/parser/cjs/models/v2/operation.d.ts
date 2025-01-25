import { OperationTrait } from './operation-trait';
import type { ChannelsInterface } from '../channels';
import type { MessagesInterface } from '../messages';
import type { OperationInterface, OperationAction } from '../operation';
import type { OperationReplyInterface } from '../operation-reply';
import type { OperationTraitsInterface } from '../operation-traits';
import type { ServersInterface } from '../servers';
import type { v2 } from '../../spec-types';
export declare class Operation extends OperationTrait<v2.OperationObject> implements OperationInterface {
    action(): OperationAction;
    isSend(): boolean;
    isReceive(): boolean;
    servers(): ServersInterface;
    channels(): ChannelsInterface;
    messages(): MessagesInterface;
    reply(): OperationReplyInterface | undefined;
    traits(): OperationTraitsInterface;
}
