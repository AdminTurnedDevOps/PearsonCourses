"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageExample = void 0;
const base_1 = require("../base");
const mixins_1 = require("./mixins");
class MessageExample extends base_1.BaseModel {
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    hasSummary() {
        return !!this._json.summary;
    }
    summary() {
        return this._json.summary;
    }
    hasHeaders() {
        return !!this._json.headers;
    }
    headers() {
        return this._json.headers;
    }
    hasPayload() {
        return !!this._json.payload;
    }
    payload() {
        return this._json.payload;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.MessageExample = MessageExample;
