import { Collection } from '../collection';
import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';
export declare class Channels extends Collection<ChannelInterface> implements ChannelsInterface {
    get(id: string): ChannelInterface | undefined;
    filterBySend(): ChannelInterface[];
    filterByReceive(): ChannelInterface[];
}
