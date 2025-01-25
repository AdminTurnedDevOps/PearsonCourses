"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const base_1 = require("./base");
const mixins_1 = require("./mixins");
class Tag extends base_1.Base {
    name() {
        return this._json.name;
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
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
exports.Tag = Tag;
