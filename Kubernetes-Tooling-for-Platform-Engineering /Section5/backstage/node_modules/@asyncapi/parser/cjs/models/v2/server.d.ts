import { BaseModel } from '../base';
import { SecurityRequirements } from './security-requirements';
import type { ChannelsInterface } from '../channels';
import type { OperationsInterface } from '../operations';
import type { MessagesInterface } from '../messages';
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';
import type { ExtensionsInterface } from '../extensions';
import type { BindingsInterface } from '../bindings';
import type { TagsInterface } from '../tags';
import type { v2 } from '../../spec-types';
export declare class Server extends BaseModel<v2.ServerObject, {
    id: string;
}> implements ServerInterface {
    id(): string;
    url(): string;
    host(): string;
    hasPathname(): boolean;
    pathname(): string | undefined;
    protocol(): string;
    hasProtocolVersion(): boolean;
    protocolVersion(): string | undefined;
    hasDescription(): boolean;
    description(): string | undefined;
    channels(): ChannelsInterface;
    operations(): OperationsInterface;
    messages(): MessagesInterface;
    variables(): ServerVariablesInterface;
    security(): SecurityRequirements[];
    tags(): TagsInterface;
    bindings(): BindingsInterface;
    extensions(): ExtensionsInterface;
}
