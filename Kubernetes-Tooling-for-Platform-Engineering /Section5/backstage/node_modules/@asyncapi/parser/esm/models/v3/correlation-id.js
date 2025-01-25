import { BaseModel } from '../base';
import { hasDescription, description, extensions } from './mixins';
export class CorrelationId extends BaseModel {
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    hasLocation() {
        return !!this._json.location;
    }
    location() {
        return this._json.location;
    }
    extensions() {
        return extensions(this);
    }
}
