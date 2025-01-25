"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationReplyAddresses = void 0;
const collection_1 = require("../collection");
class OperationReplyAddresses extends collection_1.Collection {
    get(id) {
        return this.collections.find(reply => reply.id() === id);
    }
}
exports.OperationReplyAddresses = OperationReplyAddresses;
