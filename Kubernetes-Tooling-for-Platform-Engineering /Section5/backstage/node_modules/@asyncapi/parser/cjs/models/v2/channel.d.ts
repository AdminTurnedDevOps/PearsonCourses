import { BaseModel } from '../base';
import type { BindingsInterface } from '../bindings';
import type { ChannelInterface } from '../channel';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ExtensionsInterface } from '../extensions';
import type { MessagesInterface } from '../messages';
import type { OperationsInterface } from '../operations';
import type { ServersInterface } from '../servers';
import type { v2 } from '../../spec-types';
export declare class Channel extends BaseModel<v2.ChannelObject, {
    id: string;
    address: string;
}> implements ChannelInterface {
    id(): string;
    address(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    servers(): ServersInterface;
    operations(): OperationsInterface;
    messages(): MessagesInterface;
    parameters(): ChannelParametersInterface;
    bindings(): BindingsInterface;
    extensions(): ExtensionsInterface;
}
