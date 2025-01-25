"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationReplies = void 0;
const collection_1 = require("../collection");
class OperationReplies extends collection_1.Collection {
    get(id) {
        return this.collections.find(reply => reply.id() === id);
    }
}
exports.OperationReplies = OperationReplies;
