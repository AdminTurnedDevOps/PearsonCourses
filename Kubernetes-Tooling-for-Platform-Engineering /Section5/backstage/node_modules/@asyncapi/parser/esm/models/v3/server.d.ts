import { SecurityRequirements } from './security-requirements';
import { CoreModel } from './mixins';
import type { ChannelsInterface } from '../channels';
import type { OperationsInterface } from '../operations';
import type { MessagesInterface } from '../messages';
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';
import type { v3 } from '../../spec-types';
export declare class Server extends CoreModel<v3.ServerObject, {
    id: string;
}> implements ServerInterface {
    id(): string;
    url(): string;
    host(): string;
    protocol(): string;
    hasPathname(): boolean;
    pathname(): string | undefined;
    hasProtocolVersion(): boolean;
    protocolVersion(): string | undefined;
    channels(): ChannelsInterface;
    operations(): OperationsInterface;
    messages(): MessagesInterface;
    variables(): ServerVariablesInterface;
    security(): SecurityRequirements[];
}
