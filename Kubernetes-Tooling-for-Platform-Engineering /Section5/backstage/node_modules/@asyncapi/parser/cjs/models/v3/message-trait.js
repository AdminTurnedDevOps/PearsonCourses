"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTrait = void 0;
const correlation_id_1 = require("./correlation-id");
const message_examples_1 = require("./message-examples");
const message_example_1 = require("./message-example");
const schema_1 = require("./schema");
const constants_1 = require("../../constants");
const mixins_1 = require("./mixins");
class MessageTrait extends mixins_1.CoreModel {
    id() {
        var _a;
        return this._meta.id || ((_a = this.extensions().get(constants_1.xParserMessageName)) === null || _a === void 0 ? void 0 : _a.value());
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
        return this.createModel(correlation_id_1.CorrelationId, this._json.correlationId, { pointer: this.jsonPath('correlationId') });
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
        return this.createModel(schema_1.Schema, this._json.headers, { pointer: this.jsonPath('headers') });
    }
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    examples() {
        return new message_examples_1.MessageExamples((this._json.examples || []).map((example, index) => {
            return this.createModel(message_example_1.MessageExample, example, { pointer: this.jsonPath(`examples/${index}`) });
        }));
    }
}
exports.MessageTrait = MessageTrait;
