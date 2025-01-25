import { BaseModel } from '../base';
import { hasDescription, description, extensions } from './mixins';
export class OperationReplyAddress extends BaseModel {
    id() {
        return this._meta.id;
    }
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
