import { BaseModel } from '../base';
import { hasDescription, description, extensions } from './mixins';
export class CorrelationId extends BaseModel {
    location() {
        return this._json.location;
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
