import { BaseModel } from '../base';
import { CorrelationId } from './correlation-id';
import { MessageExamples } from './message-examples';
import { MessageExample } from './message-example';
import { Schema } from './schema';
import { xParserMessageName } from '../../constants';
import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';
import { getDefaultSchemaFormat } from '../../schema-parser';
export class MessageTrait extends BaseModel {
    id() {
        return this._json.messageId || this._meta.id || this.json(xParserMessageName);
    }
    hasSchemaFormat() {
        return this.schemaFormat() !== undefined;
    }
    schemaFormat() {
        return this._json.schemaFormat || getDefaultSchemaFormat(this._meta.asyncapi.semver.version);
    }
    hasMessageId() {
        return !!this._json.messageId;
    }
    hasCorrelationId() {
        return !!this._json.correlationId;
    }
    correlationId() {
        if (!this._json.correlationId)
            return undefined;
        return this.createModel(CorrelationId, this._json.correlationId, { pointer: `${this._meta.pointer}/correlationId` });
    }
    hasContentType() {
        return !!this._json.contentType;
    }
    contentType() {
        var _a;
        return this._json.contentType || ((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.defaultContentType);
    }
    hasHeaders() {
        return !!this._json.headers;
    }
    headers() {
        if (!this._json.headers)
            return undefined;
        return this.createModel(Schema, this._json.headers, { pointer: `${this._meta.pointer}/headers` });
    }
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    hasTitle() {
        return !!this._json.title;
    }
    title() {
        return this._json.title;
    }
    hasSummary() {
        return !!this._json.summary;
    }
    summary() {
        return this._json.summary;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    hasExternalDocs() {
        return hasExternalDocs(this);
    }
    externalDocs() {
        return externalDocs(this);
    }
    examples() {
        return new MessageExamples((this._json.examples || []).map((example, index) => {
            return this.createModel(MessageExample, example, { pointer: `${this._meta.pointer}/examples/${index}` });
        }));
    }
    tags() {
        return tags(this);
    }
    bindings() {
        return bindings(this);
    }
    extensions() {
        return extensions(this);
    }
}
