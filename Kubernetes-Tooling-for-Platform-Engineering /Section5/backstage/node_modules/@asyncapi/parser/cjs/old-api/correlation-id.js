"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrelationId = void 0;
const mixins_1 = require("./mixins");
class CorrelationId extends mixins_1.SpecificationExtensionsModel {
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    location() {
        return this._json.location;
    }
}
exports.CorrelationId = CorrelationId;
