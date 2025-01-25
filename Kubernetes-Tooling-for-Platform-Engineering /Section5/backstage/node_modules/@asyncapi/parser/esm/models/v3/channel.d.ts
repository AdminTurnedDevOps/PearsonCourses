import { CoreModel } from './mixins';
import type { ChannelInterface } from '../channel';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { MessagesInterface } from '../messages';
import type { OperationsInterface } from '../operations';
import type { ServersInterface } from '../servers';
import type { v3 } from '../../spec-types';
export declare class Channel extends CoreModel<v3.ChannelObject, {
    id: string;
}> implements ChannelInterface {
    id(): string;
    address(): string | null | undefined;
    servers(): ServersInterface;
    operations(): OperationsInterface;
    messages(): MessagesInterface;
    parameters(): ChannelParametersInterface;
}
