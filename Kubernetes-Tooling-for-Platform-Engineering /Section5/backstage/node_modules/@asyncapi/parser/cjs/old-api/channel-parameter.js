"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelParameter = void 0;
const mixins_1 = require("./mixins");
const schema_1 = require("./schema");
class ChannelParameter extends mixins_1.SpecificationExtensionsModel {
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    schema() {
        if (!this._json.schema)
            return null;
        return new schema_1.Schema(this._json.schema);
    }
    location() {
        return this._json.location;
    }
}
exports.ChannelParameter = ChannelParameter;
