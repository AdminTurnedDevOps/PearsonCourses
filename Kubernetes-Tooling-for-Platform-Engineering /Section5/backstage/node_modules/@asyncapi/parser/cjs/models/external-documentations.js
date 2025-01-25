"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalDocumentations = void 0;
const collection_1 = require("./collection");
class ExternalDocumentations extends collection_1.Collection {
    get(id) {
        return this.collections.find(externalDocs => externalDocs.meta('id') === id);
    }
}
exports.ExternalDocumentations = ExternalDocumentations;
