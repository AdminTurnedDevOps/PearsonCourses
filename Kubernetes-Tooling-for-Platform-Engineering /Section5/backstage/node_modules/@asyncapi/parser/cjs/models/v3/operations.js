"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = void 0;
const collection_1 = require("../collection");
class Operations extends collection_1.Collection {
    get(id) {
        return this.collections.find(operation => operation.id() === id);
    }
    filterBySend() {
        return this.filterBy(operation => operation.isSend());
    }
    filterByReceive() {
        return this.filterBy(operation => operation.isReceive());
    }
}
exports.Operations = Operations;
