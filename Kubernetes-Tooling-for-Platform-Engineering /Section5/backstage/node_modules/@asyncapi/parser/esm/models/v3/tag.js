import { BaseModel } from '../base';
import { hasDescription, description, extensions, hasExternalDocs, externalDocs } from './mixins';
export class Tag extends BaseModel {
    id() {
        return this._meta.id;
    }
    name() {
        return this._json.name;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    extensions() {
        return extensions(this);
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
}
