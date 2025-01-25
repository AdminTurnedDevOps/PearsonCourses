import { SpecificationExtensionsModel, description, hasDescription } from './mixins';
import { Schema } from './schema';
export class ChannelParameter extends SpecificationExtensionsModel {
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    schema() {
        if (!this._json.schema)
            return null;
        return new Schema(this._json.schema);
    }
    location() {
        return this._json.location;
    }
}
