"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const base_1 = require("../base");
const constants_1 = require("../../constants");
const mixins_1 = require("./mixins");
const schema_parser_1 = require("../../schema-parser");
class Schema extends base_1.BaseModel {
    // The following constructor is needed because, starting from AsyncAPI v3, schemas can be multi-format as well.
    constructor(_json, _meta = {}) {
        var _a, _b;
        super(_json, _meta);
        this._json = _json;
        this._meta = _meta;
        // Based on the shape of the JSON, we grab the data for the Schema from the root (Schema) or rather from `schema` field (MultiFormatSchema).
        if (typeof _json === 'object' && typeof _json.schema === 'object') {
            this._schemaObject = _json.schema;
            this._schemaFormat = _json.schemaFormat;
        }
        else {
            this._schemaObject = _json;
            this._schemaFormat = (0, schema_parser_1.getDefaultSchemaFormat)((_b = (_a = _meta.asyncapi) === null || _a === void 0 ? void 0 : _a.semver) === null || _b === void 0 ? void 0 : _b.version);
        }
    }
    id() {
        return this.$id() || this._meta.id || this._schemaObject[constants_1.xParserSchemaId];
    }
    $comment() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.$comment;
    }
    $id() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.$id;
    }
    $schema() {
        var _a;
        if (typeof this._schemaObject === 'boolean')
            return 'http://json-schema.org/draft-07/schema#';
        return (_a = this._schemaObject.$schema) !== null && _a !== void 0 ? _a : 'http://json-schema.org/draft-07/schema#';
    }
    additionalItems() {
        if (typeof this._schemaObject === 'boolean')
            return this._schemaObject;
        if (this._schemaObject.additionalItems === undefined)
            return true;
        if (typeof this._schemaObject.additionalItems === 'boolean')
            return this._schemaObject.additionalItems;
        return this.createModel(Schema, this._schemaObject.additionalItems, { pointer: `${this._meta.pointer}/additionalItems`, parent: this });
    }
    additionalProperties() {
        if (typeof this._schemaObject === 'boolean')
            return this._schemaObject;
        if (this._schemaObject.additionalProperties === undefined)
            return true;
        if (typeof this._schemaObject.additionalProperties === 'boolean')
            return this._schemaObject.additionalProperties;
        return this.createModel(Schema, this._schemaObject.additionalProperties, { pointer: `${this._meta.pointer}/additionalProperties`, parent: this });
    }
    allOf() {
        if (typeof this._schemaObject === 'boolean')
            return;
        if (!Array.isArray(this._schemaObject.allOf))
            return undefined;
        return this._schemaObject.allOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/allOf/${index}`, parent: this }));
    }
    anyOf() {
        if (typeof this._schemaObject === 'boolean')
            return;
        if (!Array.isArray(this._schemaObject.anyOf))
            return undefined;
        return this._schemaObject.anyOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/anyOf/${index}`, parent: this }));
    }
    const() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.const;
    }
    contains() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.contains !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.contains, { pointer: `${this._meta.pointer}/contains`, parent: this });
    }
    contentEncoding() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.contentEncoding;
    }
    contentMediaType() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.contentMediaType;
    }
    default() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.default;
    }
    definitions() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.definitions !== 'object')
            return;
        return Object.entries(this._schemaObject.definitions).reduce((acc, [key, s]) => {
            acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/definitions/${key}`, parent: this });
            return acc;
        }, {});
    }
    description() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.description;
    }
    dependencies() {
        if (typeof this._schemaObject === 'boolean')
            return;
        if (typeof this._schemaObject.dependencies !== 'object')
            return undefined;
        return Object.entries(this._schemaObject.dependencies).reduce((acc, [key, s]) => {
            acc[key] = Array.isArray(s) ? s : this.createModel(Schema, s, { pointer: `${this._meta.pointer}/dependencies/${key}`, parent: this });
            return acc;
        }, {});
    }
    deprecated() {
        if (typeof this._schemaObject === 'boolean')
            return false;
        return this._schemaObject.deprecated || false;
    }
    discriminator() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.discriminator;
    }
    else() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.else !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.else, { pointer: `${this._meta.pointer}/else`, parent: this });
    }
    enum() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.enum;
    }
    examples() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.examples;
    }
    exclusiveMaximum() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.exclusiveMaximum;
    }
    exclusiveMinimum() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.exclusiveMinimum;
    }
    format() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.format;
    }
    isBooleanSchema() {
        return typeof this._schemaObject === 'boolean';
    }
    if() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.if !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.if, { pointer: `${this._meta.pointer}/if`, parent: this });
    }
    isCircular() {
        let parent = this._meta.parent;
        while (parent) {
            if (parent._json === this._schemaObject)
                return true;
            parent = parent._meta.parent;
        }
        return false;
    }
    items() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.items !== 'object')
            return;
        if (Array.isArray(this._schemaObject.items)) {
            return this._schemaObject.items.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/items/${index}`, parent: this }));
        }
        return this.createModel(Schema, this._schemaObject.items, { pointer: `${this._meta.pointer}/items`, parent: this });
    }
    maximum() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.maximum;
    }
    maxItems() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.maxItems;
    }
    maxLength() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.maxLength;
    }
    maxProperties() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.maxProperties;
    }
    minimum() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.minimum;
    }
    minItems() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.minItems;
    }
    minLength() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.minLength;
    }
    minProperties() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.minProperties;
    }
    multipleOf() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.multipleOf;
    }
    not() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.not !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.not, { pointer: `${this._meta.pointer}/not`, parent: this });
    }
    oneOf() {
        if (typeof this._schemaObject === 'boolean')
            return;
        if (!Array.isArray(this._schemaObject.oneOf))
            return undefined;
        return this._schemaObject.oneOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/oneOf/${index}`, parent: this }));
    }
    pattern() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.pattern;
    }
    patternProperties() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.patternProperties !== 'object')
            return;
        return Object.entries(this._schemaObject.patternProperties).reduce((acc, [key, s]) => {
            acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/patternProperties/${key}`, parent: this });
            return acc;
        }, {});
    }
    properties() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.properties !== 'object')
            return;
        return Object.entries(this._schemaObject.properties).reduce((acc, [key, s]) => {
            acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/properties/${key}`, parent: this });
            return acc;
        }, {});
    }
    property(name) {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.properties !== 'object' || typeof this._schemaObject.properties[name] !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.properties[name], { pointer: `${this._meta.pointer}/properties/${name}`, parent: this });
    }
    propertyNames() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.propertyNames !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.propertyNames, { pointer: `${this._meta.pointer}/propertyNames`, parent: this });
    }
    readOnly() {
        if (typeof this._schemaObject === 'boolean')
            return false;
        return this._schemaObject.readOnly || false;
    }
    required() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.required;
    }
    schemaFormat() {
        return this._schemaFormat;
    }
    then() {
        if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.then !== 'object')
            return;
        return this.createModel(Schema, this._schemaObject.then, { pointer: `${this._meta.pointer}/then`, parent: this });
    }
    title() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.title;
    }
    type() {
        if (typeof this._schemaObject === 'boolean')
            return;
        return this._schemaObject.type;
    }
    uniqueItems() {
        if (typeof this._schemaObject === 'boolean')
            return false;
        return this._schemaObject.uniqueItems || false;
    }
    writeOnly() {
        if (typeof this._schemaObject === 'boolean')
            return false;
        return this._schemaObject.writeOnly || false;
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.Schema = Schema;
