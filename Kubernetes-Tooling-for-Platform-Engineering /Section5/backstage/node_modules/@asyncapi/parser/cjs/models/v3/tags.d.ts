import { Collection } from '../collection';
import type { TagsInterface } from '../tags';
import type { TagInterface } from '../tag';
export declare class Tags extends Collection<TagInterface> implements TagsInterface {
    get(name: string): TagInterface | undefined;
}
