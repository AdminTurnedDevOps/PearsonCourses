"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extensions = void 0;
const collection_1 = require("../collection");
class Extensions extends collection_1.Collection {
    get(id) {
        id = id.startsWith('x-') ? id : `x-${id}`;
        return this.collections.find(ext => ext.id() === id);
    }
}
exports.Extensions = Extensions;
