export class BaseModel {
    constructor(_json, _meta = {}) {
        this._json = _json;
        this._meta = _meta;
    }
    json(key) {
        if (key === undefined)
            return this._json;
        if (this._json === null || this._json === undefined)
            return this._json;
        return this._json[key];
    }
    meta(key) {
        if (key === undefined)
            return this._meta;
        if (!this._meta)
            return;
        return this._meta[key];
    }
    jsonPath(field) {
        if (typeof field !== 'string') {
            return this._meta.pointer;
        }
        return `${this._meta.pointer}/${field}`;
    }
    createModel(Model, value, meta) {
        return new Model(value, Object.assign(Object.assign({}, meta), { asyncapi: this._meta.asyncapi }));
    }
}
