"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelParameter = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
const schema_1 = require("./schema");
class ChannelParameter extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    hasSchema() {
        return true;
    }
    schema() {
        return this.createModel(schema_1.Schema, {
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
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.ChannelParameter = ChannelParameter;
