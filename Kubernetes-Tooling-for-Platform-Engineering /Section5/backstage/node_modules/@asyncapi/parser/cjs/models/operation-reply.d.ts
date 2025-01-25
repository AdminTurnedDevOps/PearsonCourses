import type { BaseModel } from './base';
import type { ExtensionsMixinInterface } from './mixins';
import type { ChannelInterface } from './channel';
import type { MessagesInterface } from './messages';
import type { OperationReplyAddressInterface } from './operation-reply-address';
export interface OperationReplyInterface extends BaseModel, ExtensionsMixinInterface {
    id(): string | undefined;
    hasAddress(): boolean;
    address(): OperationReplyAddressInterface | undefined;
    hasChannel(): boolean;
    channel(): ChannelInterface | undefined;
    messages(): MessagesInterface;
}
