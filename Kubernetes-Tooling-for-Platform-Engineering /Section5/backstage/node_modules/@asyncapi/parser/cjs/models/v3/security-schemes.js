"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuritySchemes = void 0;
const collection_1 = require("../collection");
class SecuritySchemes extends collection_1.Collection {
    get(id) {
        return this.collections.find(securityScheme => securityScheme.id() === id);
    }
}
exports.SecuritySchemes = SecuritySchemes;
