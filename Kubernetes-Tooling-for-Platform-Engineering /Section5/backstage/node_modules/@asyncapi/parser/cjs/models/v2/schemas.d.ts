import { Collection } from '../collection';
import type { SchemasInterface } from '../schemas';
import type { SchemaInterface } from '../schema';
export declare class Schemas extends Collection<SchemaInterface> implements SchemasInterface {
    get(id: string): SchemaInterface | undefined;
}
