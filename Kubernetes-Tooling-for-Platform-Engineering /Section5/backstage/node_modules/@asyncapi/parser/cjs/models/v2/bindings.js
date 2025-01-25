"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bindings = void 0;
const collection_1 = require("../collection");
const extensions_1 = require("./extensions");
const extension_1 = require("./extension");
const utils_1 = require("../utils");
const constants_1 = require("../../constants");
class Bindings extends collection_1.Collection {
    get(name) {
        return this.collections.find(binding => binding.protocol() === name);
    }
    extensions() {
        const extensions = [];
        Object.entries(this._meta.originalData || {}).forEach(([id, value]) => {
            if (constants_1.EXTENSION_REGEX.test(id)) {
                extensions.push((0, utils_1.createModel)(extension_1.Extension, value, { id, pointer: `${this._meta.pointer}/${id}`, asyncapi: this._meta.asyncapi }));
            }
        });
        return new extensions_1.Extensions(extensions);
    }
}
exports.Bindings = Bindings;
