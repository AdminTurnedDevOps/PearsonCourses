"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMapOfType = exports.getMapValue = exports.tagsMixins = exports.bindingsMixins = exports.extensionsMixins = exports.externalDocs = exports.hasExternalDocs = exports.description = exports.hasDescription = exports.SpecificationExtensionsModel = void 0;
const base_1 = require("./base");
const external_docs_1 = require("./external-docs");
const tag_1 = require("./tag");
const constants_1 = require("../constants");
class SpecificationExtensionsModel extends base_1.Base {
    hasExtensions() {
        return exports.extensionsMixins.hasExtensions(this);
    }
    extensions() {
        return exports.extensionsMixins.extensions(this);
    }
    extensionKeys() {
        return exports.extensionsMixins.extensionKeys(this);
    }
    extKeys() {
        return exports.extensionsMixins.extKeys(this);
    }
    hasExtension(extension) {
        return exports.extensionsMixins.hasExtension(this, extension);
    }
    extension(extension) {
        return exports.extensionsMixins.extension(this, extension);
    }
    hasExt(extension) {
        return exports.extensionsMixins.hasExt(this, extension);
    }
    ext(extension) {
        return exports.extensionsMixins.ext(this, extension);
    }
}
exports.SpecificationExtensionsModel = SpecificationExtensionsModel;
function hasDescription(model) {
    return Boolean(model.json('description'));
}
exports.hasDescription = hasDescription;
function description(model) {
    const description = model.json('description');
    return typeof description === 'string' ? description : null;
}
exports.description = description;
function hasExternalDocs(model) {
    return Object.keys(model.json('externalDocs') || {}).length > 0;
}
exports.hasExternalDocs = hasExternalDocs;
function externalDocs(model) {
    if (typeof model.json('externalDocs') === 'object') {
        return new external_docs_1.ExternalDocs(model.json('externalDocs'));
    }
    return null;
}
exports.externalDocs = externalDocs;
exports.extensionsMixins = {
    hasExtensions(model) {
        return !!exports.extensionsMixins.extensionKeys(model).length;
    },
    extensions(model) {
        const result = {};
        Object.entries(model.json()).forEach(([key, value]) => {
            if (constants_1.EXTENSION_REGEX.test(key)) {
                result[key] = value;
            }
        });
        return result;
    },
    extensionKeys(model) {
        return Object.keys(exports.extensionsMixins.extensions(model));
    },
    extKeys(model) {
        return exports.extensionsMixins.extensionKeys(model);
    },
    hasExtension(model, extension) {
        if (!extension.startsWith('x-')) {
            return false;
        }
        return !!model.json()[extension];
    },
    extension(model, extension) {
        if (!extension.startsWith('x-')) {
            return null;
        }
        return model.json()[extension];
    },
    hasExt(model, extension) {
        return exports.extensionsMixins.hasExtension(model, extension);
    },
    ext(model, extension) {
        return exports.extensionsMixins.extension(model, extension);
    },
};
exports.bindingsMixins = {
    hasBindings(model) {
        return !!Object.keys(exports.bindingsMixins.bindings(model)).length;
    },
    bindings(model) {
        return model.json('bindings') || {};
    },
    bindingProtocols(model) {
        return Object.keys(exports.bindingsMixins.bindings(model));
    },
    hasBinding(model, name) {
        return !!exports.bindingsMixins.binding(model, name);
    },
    binding(model, name) {
        return getMapValue(model.json('bindings'), name);
    },
};
exports.tagsMixins = {
    hasTags(model) {
        return !!exports.tagsMixins.tags(model).length;
    },
    tags(model) {
        const tags = model.json('tags');
        return tags ? tags.map(t => new tag_1.Tag(t)) : [];
    },
    tagNames(model) {
        const tags = model.json('tags');
        return tags ? tags.map(t => t.name) : [];
    },
    hasTag(model, name) {
        return !!exports.tagsMixins.tag(model, name);
    },
    tag(model, name) {
        const tg = (model.json('tags') || []).find(t => t.name === name);
        return tg ? new tag_1.Tag(tg) : null;
    },
};
function getMapValue(obj, key, Type, meta) {
    if (typeof key !== 'string' || !obj)
        return null;
    const v = obj[String(key)];
    if (v === undefined)
        return null;
    return Type ? new Type(v, meta) : v;
}
exports.getMapValue = getMapValue;
function createMapOfType(obj, Type, meta) {
    const result = {};
    if (!obj)
        return result;
    Object.entries(obj).forEach(([key, value]) => {
        result[key] = new Type(value, meta);
    });
    return result;
}
exports.createMapOfType = createMapOfType;
