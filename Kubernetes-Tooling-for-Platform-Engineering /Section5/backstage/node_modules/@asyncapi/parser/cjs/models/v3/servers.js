"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servers = void 0;
const collection_1 = require("../collection");
class Servers extends collection_1.Collection {
    get(id) {
        return this.collections.find(server => server.id() === id);
    }
    filterBySend() {
        return this.filterBy(server => server.operations().filterBySend().length > 0);
    }
    filterByReceive() {
        return this.filterBy(server => server.operations().filterByReceive().length > 0);
    }
}
exports.Servers = Servers;
