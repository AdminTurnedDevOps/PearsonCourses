"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationTraits = void 0;
const collection_1 = require("../collection");
class OperationTraits extends collection_1.Collection {
    get(id) {
        return this.collections.find(trait => trait.id() === id);
    }
}
exports.OperationTraits = OperationTraits;
