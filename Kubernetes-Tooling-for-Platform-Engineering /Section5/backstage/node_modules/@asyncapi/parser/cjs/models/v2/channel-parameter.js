"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelParameter = void 0;
const base_1 = require("../base");
const schema_1 = require("./schema");
const mixins_1 = require("./mixins");
class ChannelParameter extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    hasSchema() {
        return !!this._json.schema;
    }
    schema() {
        if (!this._json.schema)
            return undefined;
        return this.createModel(schema_1.Schema, this._json.schema, { pointer: `${this._meta.pointer}/schema` });
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
