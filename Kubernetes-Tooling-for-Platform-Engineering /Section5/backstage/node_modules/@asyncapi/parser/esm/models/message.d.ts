import type { BaseModel } from './base';
import type { ChannelsInterface } from './channels';
import type { MessageTraitsInterface } from './message-traits';
import type { MessageTraitInterface } from './message-trait';
import type { OperationsInterface } from './operations';
import type { SchemaInterface } from './schema';
import type { ServersInterface } from './servers';
export interface MessageInterface extends BaseModel, MessageTraitInterface {
    hasPayload(): boolean;
    payload(): SchemaInterface | undefined;
    servers(): ServersInterface;
    channels(): ChannelsInterface;
    operations(): OperationsInterface;
    traits(): MessageTraitsInterface;
}
