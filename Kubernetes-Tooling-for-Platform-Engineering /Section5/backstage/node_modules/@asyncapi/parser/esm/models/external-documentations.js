import { Collection } from './collection';
export class ExternalDocumentations extends Collection {
    get(id) {
        return this.collections.find(externalDocs => externalDocs.meta('id') === id);
    }
}
