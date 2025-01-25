"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrelationId = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class CorrelationId extends base_1.BaseModel {
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
exports.CorrelationId = CorrelationId;
