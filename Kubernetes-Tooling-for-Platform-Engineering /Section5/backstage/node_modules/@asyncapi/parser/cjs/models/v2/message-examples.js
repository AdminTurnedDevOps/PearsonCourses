"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageExamples = void 0;
const collection_1 = require("../collection");
class MessageExamples extends collection_1.Collection {
    get(name) {
        return this.collections.find(example => example.name() === name);
    }
}
exports.MessageExamples = MessageExamples;
