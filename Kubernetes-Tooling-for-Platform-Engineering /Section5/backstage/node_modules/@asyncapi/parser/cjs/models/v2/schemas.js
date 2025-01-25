"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
const collection_1 = require("../collection");
class Schemas extends collection_1.Collection {
    get(id) {
        return this.collections.find(schema => schema.id() === id);
    }
}
exports.Schemas = Schemas;
