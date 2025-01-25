import { BaseModel } from '../base';
import { MessagesInterface } from '../messages';
import type { ExtensionsInterface } from '../extensions';
import type { OperationReplyInterface } from '../operation-reply';
import type { OperationReplyAddressInterface } from '../operation-reply-address';
import type { ChannelInterface } from '../channel';
import type { v3 } from '../../spec-types';
export declare class OperationReply extends BaseModel<v3.OperationReplyObject, {
    id?: string;
}> implements OperationReplyInterface {
    id(): string | undefined;
    hasAddress(): boolean;
    address(): OperationReplyAddressInterface | undefined;
    hasChannel(): boolean;
    channel(): ChannelInterface | undefined;
    messages(): MessagesInterface;
    extensions(): ExtensionsInterface;
}
