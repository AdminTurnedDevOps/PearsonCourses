"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerVariables = void 0;
const collection_1 = require("../collection");
class ServerVariables extends collection_1.Collection {
    get(id) {
        return this.collections.find(variable => variable.id() === id);
    }
}
exports.ServerVariables = ServerVariables;
