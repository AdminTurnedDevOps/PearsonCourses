import { BaseModel } from '../base';
import { hasDescription, description, extensions } from './mixins';
import { Schema } from './schema';
export class ChannelParameter extends BaseModel {
    id() {
        return this._meta.id;
    }
    hasSchema() {
        return true;
    }
    schema() {
        return this.createModel(Schema, {
            type: 'string',
            description: this._json.description,
            enum: this._json.enum,
            default: this._json.default,
            examples: this._json.examples
        }, { pointer: `${this._meta.pointer}` });
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
