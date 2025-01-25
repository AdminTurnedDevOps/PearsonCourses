"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalDocs = void 0;
const base_1 = require("./base");
const mixins_1 = require("./mixins");
class ExternalDocs extends base_1.Base {
    url() {
        return this._json.url;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasExtensions() {
        return mixins_1.extensionsMixins.hasExtensions(this);
    }
    extensions() {
        return mixins_1.extensionsMixins.extensions(this);
    }
    extensionKeys() {
        return mixins_1.extensionsMixins.extensionKeys(this);
    }
    extKeys() {
        return mixins_1.extensionsMixins.extKeys(this);
    }
    hasExtension(extension) {
        return mixins_1.extensionsMixins.hasExtension(this, extension);
    }
    extension(extension) {
        return mixins_1.extensionsMixins.extension(this, extension);
    }
    hasExt(extension) {
        return mixins_1.extensionsMixins.hasExt(this, extension);
    }
    ext(extension) {
        return mixins_1.extensionsMixins.ext(this, extension);
    }
}
exports.ExternalDocs = ExternalDocs;
