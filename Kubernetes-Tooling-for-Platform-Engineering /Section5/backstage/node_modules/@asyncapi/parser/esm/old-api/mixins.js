import { Base } from './base';
import { ExternalDocs } from './external-docs';
import { Tag } from './tag';
import { EXTENSION_REGEX } from '../constants';
export class SpecificationExtensionsModel extends Base {
    hasExtensions() {
        return extensionsMixins.hasExtensions(this);
    }
    extensions() {
        return extensionsMixins.extensions(this);
    }
    extensionKeys() {
        return extensionsMixins.extensionKeys(this);
    }
    extKeys() {
        return extensionsMixins.extKeys(this);
    }
    hasExtension(extension) {
        return extensionsMixins.hasExtension(this, extension);
    }
    extension(extension) {
        return extensionsMixins.extension(this, extension);
    }
    hasExt(extension) {
        return extensionsMixins.hasExt(this, extension);
    }
    ext(extension) {
        return extensionsMixins.ext(this, extension);
    }
}
export function hasDescription(model) {
    return Boolean(model.json('description'));
}
export function description(model) {
    const description = model.json('description');
    return typeof description === 'string' ? description : null;
}
export function hasExternalDocs(model) {
    return Object.keys(model.json('externalDocs') || {}).length > 0;
}
export function externalDocs(model) {
    if (typeof model.json('externalDocs') === 'object') {
        return new ExternalDocs(model.json('externalDocs'));
    }
    return null;
}
export const extensionsMixins = {
    hasExtensions(model) {
        return !!extensionsMixins.extensionKeys(model).length;
    },
    extensions(model) {
        const result = {};
        Object.entries(model.json()).forEach(([key, value]) => {
            if (EXTENSION_REGEX.test(key)) {
                result[key] = value;
            }
        });
        return result;
    },
    extensionKeys(model) {
        return Object.keys(extensionsMixins.extensions(model));
    },
    extKeys(model) {
        return extensionsMixins.extensionKeys(model);
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
        return extensionsMixins.hasExtension(model, extension);
    },
    ext(model, extension) {
        return extensionsMixins.extension(model, extension);
    },
};
export const bindingsMixins = {
    hasBindings(model) {
        return !!Object.keys(bindingsMixins.bindings(model)).length;
    },
    bindings(model) {
        return model.json('bindings') || {};
    },
    bindingProtocols(model) {
        return Object.keys(bindingsMixins.bindings(model));
    },
    hasBinding(model, name) {
        return !!bindingsMixins.binding(model, name);
    },
    binding(model, name) {
        return getMapValue(model.json('bindings'), name);
    },
};
export const tagsMixins = {
    hasTags(model) {
        return !!tagsMixins.tags(model).length;
    },
    tags(model) {
        const tags = model.json('tags');
        return tags ? tags.map(t => new Tag(t)) : [];
    },
    tagNames(model) {
        const tags = model.json('tags');
        return tags ? tags.map(t => t.name) : [];
    },
    hasTag(model, name) {
        return !!tagsMixins.tag(model, name);
    },
    tag(model, name) {
        const tg = (model.json('tags') || []).find(t => t.name === name);
        return tg ? new Tag(tg) : null;
    },
};
export function getMapValue(obj, key, Type, meta) {
    if (typeof key !== 'string' || !obj)
        return null;
    const v = obj[String(key)];
    if (v === undefined)
        return null;
    return Type ? new Type(v, meta) : v;
}
export function createMapOfType(obj, Type, meta) {
    const result = {};
    if (!obj)
        return result;
    Object.entries(obj).forEach(([key, value]) => {
        result[key] = new Type(value, meta);
    });
    return result;
}
