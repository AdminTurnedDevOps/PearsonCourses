import { Collection } from '../collection';
import { ServerInterface } from '../server';
import { ServersInterface } from '../servers';
export declare class Servers extends Collection<ServerInterface> implements ServersInterface {
    get(id: string): ServerInterface | undefined;
    filterBySend(): ServerInterface[];
    filterByReceive(): ServerInterface[];
}
