import { SpecificationExtensionsModel, description, hasDescription } from './mixins';
export class CorrelationId extends SpecificationExtensionsModel {
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    location() {
        return this._json.location;
    }
}
