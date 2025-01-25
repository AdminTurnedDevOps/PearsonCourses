"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelParameters = void 0;
const collection_1 = require("../collection");
class ChannelParameters extends collection_1.Collection {
    get(id) {
        return this.collections.find(parameter => parameter.id() === id);
    }
}
exports.ChannelParameters = ChannelParameters;
