import { CorrelationId } from './correlation-id';
import { MessageExamples } from './message-examples';
import { MessageExample } from './message-example';
import { Schema } from './schema';
import { xParserMessageName } from '../../constants';
import { CoreModel } from './mixins';
export class MessageTrait extends CoreModel {
    id() {
        var _a;
        return this._meta.id || ((_a = this.extensions().get(xParserMessageName)) === null || _a === void 0 ? void 0 : _a.value());
    }
    hasMessageId() {
        return false;
    }
    hasSchemaFormat() {
        return false;
    }
    schemaFormat() {
        return undefined;
    }
    hasCorrelationId() {
        return !!this._json.correlationId;
    }
    correlationId() {
        if (!this._json.correlationId)
            return undefined;
        return this.createModel(CorrelationId, this._json.correlationId, { pointer: this.jsonPath('correlationId') });
    }
    hasContentType() {
        return !!this._json.contentType;
    }
    contentType() {
        var _a, _b;
        return this._json.contentType || ((_b = (_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.defaultContentType);
    }
    hasHeaders() {
        return !!this._json.headers;
    }
    headers() {
        if (!this._json.headers)
            return undefined;
        return this.createModel(Schema, this._json.headers, { pointer: this.jsonPath('headers') });
    }
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    examples() {
        return new MessageExamples((this._json.examples || []).map((example, index) => {
            return this.createModel(MessageExample, example, { pointer: this.jsonPath(`examples/${index}`) });
        }));
    }
}
