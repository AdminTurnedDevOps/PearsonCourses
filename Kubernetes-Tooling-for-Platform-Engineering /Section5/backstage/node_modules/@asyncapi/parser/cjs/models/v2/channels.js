"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channels = void 0;
const collection_1 = require("../collection");
class Channels extends collection_1.Collection {
    get(id) {
        return this.collections.find(channel => channel.id() === id);
    }
    filterBySend() {
        return this.filterBy(channel => channel.operations().filterBySend().length > 0);
    }
    filterByReceive() {
        return this.filterBy(channel => channel.operations().filterByReceive().length > 0);
    }
}
exports.Channels = Channels;
