"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRequirements = void 0;
const collection_1 = require("../collection");
class SecurityRequirements extends collection_1.Collection {
    get(id) {
        return this.collections.find(securityRequirement => securityRequirement.meta('id') === id);
    }
}
exports.SecurityRequirements = SecurityRequirements;
