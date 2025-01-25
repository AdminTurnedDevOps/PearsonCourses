"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection extends Array {
    constructor(collections, _meta = {}) {
        super(...collections);
        this.collections = collections;
        this._meta = _meta;
    }
    has(id) {
        return typeof this.get(id) !== 'undefined';
    }
    all() {
        return this.collections;
    }
    isEmpty() {
        return this.collections.length === 0;
    }
    filterBy(filter) {
        return this.collections.filter(filter);
    }
    meta(key) {
        if (key === undefined)
            return this._meta;
        if (!this._meta)
            return;
        return this._meta[String(key)];
    }
}
exports.Collection = Collection;
