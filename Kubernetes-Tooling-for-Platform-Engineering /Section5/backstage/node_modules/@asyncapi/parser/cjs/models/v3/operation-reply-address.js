"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationReplyAddress = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class OperationReplyAddress extends base_1.BaseModel {
    id() {
        return this._meta.id;
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
exports.OperationReplyAddress = OperationReplyAddress;
