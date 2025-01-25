import { Base } from './base';
import { description, hasDescription, extensionsMixins } from './mixins';
export class ExternalDocs extends Base {
    url() {
        return this._json.url;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
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
