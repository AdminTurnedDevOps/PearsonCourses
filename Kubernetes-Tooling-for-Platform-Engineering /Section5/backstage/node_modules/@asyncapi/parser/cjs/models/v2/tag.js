"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class Tag extends base_1.BaseModel {
    name() {
        return this._json.name;
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
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
}
exports.Tag = Tag;
