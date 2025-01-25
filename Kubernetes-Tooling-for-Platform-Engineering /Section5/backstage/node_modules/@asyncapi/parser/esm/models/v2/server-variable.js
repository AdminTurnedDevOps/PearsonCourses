import { BaseModel } from '../base';
import { hasDescription, description, extensions } from './mixins';
export class ServerVariable extends BaseModel {
    id() {
        return this._meta.id;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    hasDefaultValue() {
        return !!this._json.default;
    }
    defaultValue() {
        return this._json.default;
    }
    hasAllowedValues() {
        return !!this._json.enum;
    }
    allowedValues() {
        return this._json.enum || [];
    }
    examples() {
        return this._json.examples || [];
    }
    extensions() {
        return extensions(this);
    }
}
