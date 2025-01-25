import { BaseModel } from '../base';
import { xParserSchemaId } from '../../constants';
import { extensions, hasExternalDocs, externalDocs } from './mixins';
import { getDefaultSchemaFormat } from '../../schema-parser';
export class Schema extends BaseModel {
    id() {
        return this.$id() || this._meta.id || this.json(xParserSchemaId);
    }
    $comment() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.$comment;
    }
    $id() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.$id;
    }
    $schema() {
        if (typeof this._json === 'boolean')
            return 'http://json-schema.org/draft-07/schema#';
        return this._json.$schema || 'http://json-schema.org/draft-07/schema#';
    }
    additionalItems() {
        if (typeof this._json === 'boolean')
            return this._json;
        if (typeof this._json.additionalItems === 'boolean')
            return this._json.additionalItems;
        if (this._json.additionalItems === undefined)
            return true;
        if (this._json.additionalItems === null)
            return false;
        return this.createModel(Schema, this._json.additionalItems, { pointer: `${this._meta.pointer}/additionalItems`, parent: this });
    }
    additionalProperties() {
        if (typeof this._json === 'boolean')
            return this._json;
        if (typeof this._json.additionalProperties === 'boolean')
            return this._json.additionalProperties;
        if (this._json.additionalProperties === undefined)
            return true;
        if (this._json.additionalProperties === null)
            return false;
        return this.createModel(Schema, this._json.additionalProperties, { pointer: `${this._meta.pointer}/additionalProperties`, parent: this });
    }
    allOf() {
        if (typeof this._json === 'boolean')
            return;
        if (!Array.isArray(this._json.allOf))
            return undefined;
        return this._json.allOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/allOf/${index}`, parent: this }));
    }
    anyOf() {
        if (typeof this._json === 'boolean')
            return;
        if (!Array.isArray(this._json.anyOf))
            return undefined;
        return this._json.anyOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/anyOf/${index}`, parent: this }));
    }
    const() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.const;
    }
    contains() {
        if (typeof this._json === 'boolean' || typeof this._json.contains !== 'object')
            return;
        return this.createModel(Schema, this._json.contains, { pointer: `${this._meta.pointer}/contains`, parent: this });
    }
    contentEncoding() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.contentEncoding;
    }
    contentMediaType() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.contentMediaType;
    }
    default() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.default;
    }
    definitions() {
        if (typeof this._json === 'boolean' || typeof this._json.definitions !== 'object')
            return;
        return Object.entries(this._json.definitions).reduce((acc, [key, s]) => {
            acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/definitions/${key}`, parent: this });
            return acc;
        }, {});
    }
    description() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.description;
    }
    dependencies() {
        if (typeof this._json === 'boolean')
            return;
        if (typeof this._json.dependencies !== 'object')
            return undefined;
        return Object.entries(this._json.dependencies).reduce((acc, [key, s]) => {
            acc[key] = Array.isArray(s) ? s : this.createModel(Schema, s, { pointer: `${this._meta.pointer}/dependencies/${key}`, parent: this });
            return acc;
        }, {});
    }
    deprecated() {
        if (typeof this._json === 'boolean')
            return false;
        return this._json.deprecated || false;
    }
    discriminator() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.discriminator;
    }
    else() {
        if (typeof this._json === 'boolean' || typeof this._json.else !== 'object')
            return;
        return this.createModel(Schema, this._json.else, { pointer: `${this._meta.pointer}/else`, parent: this });
    }
    enum() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.enum;
    }
    examples() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.examples;
    }
    exclusiveMaximum() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.exclusiveMaximum;
    }
    exclusiveMinimum() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.exclusiveMinimum;
    }
    format() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.format;
    }
    isBooleanSchema() {
        return typeof this._json === 'boolean';
    }
    if() {
        if (typeof this._json === 'boolean' || typeof this._json.if !== 'object')
            return;
        return this.createModel(Schema, this._json.if, { pointer: `${this._meta.pointer}/if`, parent: this });
    }
    isCircular() {
        let parent = this._meta.parent;
        while (parent) {
            if (parent._json === this._json)
                return true;
            parent = parent._meta.parent;
        }
        return false;
    }
    items() {
        if (typeof this._json === 'boolean' || typeof this._json.items !== 'object')
            return;
        if (Array.isArray(this._json.items)) {
            return this._json.items.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/items/${index}`, parent: this }));
        }
        return this.createModel(Schema, this._json.items, { pointer: `${this._meta.pointer}/items`, parent: this });
    }
    maximum() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.maximum;
    }
    maxItems() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.maxItems;
    }
    maxLength() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.maxLength;
    }
    maxProperties() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.maxProperties;
    }
    minimum() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.minimum;
    }
    minItems() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.minItems;
    }
    minLength() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.minLength;
    }
    minProperties() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.minProperties;
    }
    multipleOf() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.multipleOf;
    }
    not() {
        if (typeof this._json === 'boolean' || typeof this._json.not !== 'object')
            return;
        return this.createModel(Schema, this._json.not, { pointer: `${this._meta.pointer}/not`, parent: this });
    }
    oneOf() {
        if (typeof this._json === 'boolean')
            return;
        if (!Array.isArray(this._json.oneOf))
            return undefined;
        return this._json.oneOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/oneOf/${index}`, parent: this }));
    }
    pattern() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.pattern;
    }
    patternProperties() {
        if (typeof this._json === 'boolean' || typeof this._json.patternProperties !== 'object')
            return;
        return Object.entries(this._json.patternProperties).reduce((acc, [key, s]) => {
            acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/patternProperties/${key}`, parent: this });
            return acc;
        }, {});
    }
    properties() {
        if (typeof this._json === 'boolean' || typeof this._json.properties !== 'object')
            return;
        return Object.entries(this._json.properties).reduce((acc, [key, s]) => {
            acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/properties/${key}`, parent: this });
            return acc;
        }, {});
    }
    property(name) {
        if (typeof this._json === 'boolean' || typeof this._json.properties !== 'object' || typeof this._json.properties[name] !== 'object')
            return;
        return this.createModel(Schema, this._json.properties[name], { pointer: `${this._meta.pointer}/properties/${name}`, parent: this });
    }
    propertyNames() {
        if (typeof this._json === 'boolean' || typeof this._json.propertyNames !== 'object')
            return;
        return this.createModel(Schema, this._json.propertyNames, { pointer: `${this._meta.pointer}/propertyNames`, parent: this });
    }
    readOnly() {
        if (typeof this._json === 'boolean')
            return false;
        return this._json.readOnly || false;
    }
    required() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.required;
    }
    schemaFormat() {
        return this._meta.schemaFormat || getDefaultSchemaFormat(this._meta.asyncapi.semver.version);
    }
    then() {
        if (typeof this._json === 'boolean' || typeof this._json.then !== 'object')
            return;
        return this.createModel(Schema, this._json.then, { pointer: `${this._meta.pointer}/then`, parent: this });
    }
    title() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.title;
    }
    type() {
        if (typeof this._json === 'boolean')
            return;
        return this._json.type;
    }
    uniqueItems() {
        if (typeof this._json === 'boolean')
            return false;
        return this._json.uniqueItems || false;
    }
    writeOnly() {
        if (typeof this._json === 'boolean')
            return false;
        return this._json.writeOnly || false;
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
    extensions() {
        return extensions(this);
    }
}
