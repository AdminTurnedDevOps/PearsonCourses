import { BaseModel } from '../base';
import { Schema } from './schema';
import { hasDescription, description, extensions } from './mixins';
export class ChannelParameter extends BaseModel {
    id() {
        return this._meta.id;
    }
    hasSchema() {
        return !!this._json.schema;
    }
    schema() {
        if (!this._json.schema)
            return undefined;
        return this.createModel(Schema, this._json.schema, { pointer: `${this._meta.pointer}/schema` });
    }
    hasLocation() {
        return !!this._json.location;
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
