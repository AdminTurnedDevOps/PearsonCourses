import { Base } from './base';
import { hasDescription, description, hasExternalDocs, externalDocs, extensionsMixins } from './mixins';
export class Tag extends Base {
    name() {
        return this._json.name;
    }
    description() {
        return description(this);
    }
    hasDescription() {
        return hasDescription(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
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
