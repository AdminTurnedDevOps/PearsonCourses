import { Collection } from '../collection';
import { Extensions } from './extensions';
import { Extension } from './extension';
import { createModel } from '../utils';
import { EXTENSION_REGEX } from '../../constants';
export class Bindings extends Collection {
    get(name) {
        return this.collections.find(binding => binding.protocol() === name);
    }
    extensions() {
        const extensions = [];
        Object.entries(this._meta.originalData || {}).forEach(([id, value]) => {
            if (EXTENSION_REGEX.test(id)) {
                extensions.push(createModel(Extension, value, { id, pointer: `${this._meta.pointer}/${id}`, asyncapi: this._meta.asyncapi }));
            }
        });
        return new Extensions(extensions);
    }
}
