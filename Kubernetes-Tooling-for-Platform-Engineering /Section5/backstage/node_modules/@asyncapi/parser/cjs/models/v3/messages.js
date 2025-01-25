"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const collection_1 = require("../collection");
class Messages extends collection_1.Collection {
    get(name) {
        return this.collections.find(message => message.id() === name);
    }
    filterBySend() {
        return this.filterBy(message => message.operations().filterBySend().length > 0);
    }
    filterByReceive() {
        return this.filterBy(message => message.operations().filterByReceive().length > 0);
    }
}
exports.Messages = Messages;
