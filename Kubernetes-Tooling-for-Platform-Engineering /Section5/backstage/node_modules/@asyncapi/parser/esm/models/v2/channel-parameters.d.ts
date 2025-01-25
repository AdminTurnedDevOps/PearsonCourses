import { Collection } from '../collection';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ChannelParameterInterface } from '../channel-parameter';
export declare class ChannelParameters extends Collection<ChannelParameterInterface> implements ChannelParametersInterface {
    get(id: string): ChannelParameterInterface | undefined;
}
