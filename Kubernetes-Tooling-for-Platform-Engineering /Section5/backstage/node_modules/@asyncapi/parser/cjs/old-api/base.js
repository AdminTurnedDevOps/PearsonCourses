"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
class Base {
    constructor(_json, _meta = {}) {
        this._json = _json;
        this._meta = _meta;
        if (_json === undefined || _json === null) {
            throw new Error('Invalid JSON to instantiate the Base object.');
        }
    }
    json(key) {
        if (key === undefined || typeof this._json !== 'object')
            return this._json;
        if (!this._json)
            return;
        return this._json[key];
    }
}
exports.Base = Base;
