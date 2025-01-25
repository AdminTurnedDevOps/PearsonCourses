import type { Collection } from './collection';
import type { ChannelInterface } from './channel';
export interface ChannelsInterface extends Collection<ChannelInterface> {
    filterBySend(): ChannelInterface[];
    filterByReceive(): ChannelInterface[];
}
