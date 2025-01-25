"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrelationIds = void 0;
const collection_1 = require("../collection");
class CorrelationIds extends collection_1.Collection {
    get(id) {
        return this.collections.find(correlationId => correlationId.meta('id') === id);
    }
}
exports.CorrelationIds = CorrelationIds;
