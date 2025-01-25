import { MessageTrait } from './message-trait';
import type { ChannelsInterface } from '../channels';
import type { MessageInterface } from '../message';
import type { MessageTraitsInterface } from '../message-traits';
import type { OperationsInterface } from '../operations';
import type { ServersInterface } from '../servers';
import type { SchemaInterface } from '../schema';
import type { v2 } from '../../spec-types';
export declare class Message extends MessageTrait<v2.MessageObject> implements MessageInterface {
    hasPayload(): boolean;
    payload(): SchemaInterface | undefined;
    servers(): ServersInterface;
    channels(): ChannelsInterface;
    operations(): OperationsInterface;
    traits(): MessageTraitsInterface;
}
