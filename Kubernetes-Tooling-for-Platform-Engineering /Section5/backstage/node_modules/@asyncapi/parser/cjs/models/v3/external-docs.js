"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalDocumentation = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class ExternalDocumentation extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    url() {
        return this._json.url;
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
exports.ExternalDocumentation = ExternalDocumentation;
