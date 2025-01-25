import type { Collection } from './collection';
import type { ServerInterface } from './server';
export interface ServersInterface extends Collection<ServerInterface> {
    filterBySend(): ServerInterface[];
    filterByReceive(): ServerInterface[];
}
