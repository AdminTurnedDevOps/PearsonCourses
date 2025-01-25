"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const collection_1 = require("../collection");
class Tags extends collection_1.Collection {
    get(name) {
        return this.collections.find(tag => tag.name() === name);
    }
}
exports.Tags = Tags;
