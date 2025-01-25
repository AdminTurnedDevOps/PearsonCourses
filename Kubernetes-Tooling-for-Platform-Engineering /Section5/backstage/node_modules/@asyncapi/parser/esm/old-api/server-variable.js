import { SpecificationExtensionsModel, description, hasDescription } from './mixins';
export class ServerVariable extends SpecificationExtensionsModel {
    allowedValues() {
        return this._json.enum;
    }
    allows(name) {
        if (this._json.enum === undefined)
            return true;
        return this._json.enum.includes(name);
    }
    hasAllowedValues() {
        return this._json.enum !== undefined;
    }
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    defaultValue() {
        return this._json.default;
    }
    hasDefaultValue() {
        return this._json.default !== undefined;
    }
    examples() {
        return this._json.examples;
    }
}
