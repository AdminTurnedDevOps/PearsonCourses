import { BaseModel } from '../base';
import { hasDescription, description, extensions } from './mixins';
export class ExternalDocumentation extends BaseModel {
    url() {
        return this._json.url;
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
}
