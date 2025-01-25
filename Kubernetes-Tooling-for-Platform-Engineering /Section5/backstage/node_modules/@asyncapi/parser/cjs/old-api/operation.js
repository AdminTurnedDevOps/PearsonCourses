"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const operation_trait_1 = require("./operation-trait");
const message_1 = require("./message");
class Operation extends operation_trait_1.OperationTrait {
    traits() {
        const traits = this._json['x-parser-original-traits'] || this._json.traits;
        if (!traits)
            return [];
        return traits.map(t => new operation_trait_1.OperationTrait(t));
    }
    hasTraits() {
        return !!this._json['x-parser-original-traits'] || !!this._json.traits;
    }
    hasMultipleMessages() {
        const message = this._json.message;
        // eslint-disable-next-line sonarjs/prefer-single-boolean-return
        if (message && message.oneOf && message.oneOf.length > 1)
            return true;
        return false;
    }
    messages() {
        const message = this._json.message;
        if (!message)
            return [];
        if (message.oneOf)
            return message.oneOf.map(m => new message_1.Message(m));
        return [new message_1.Message(message)];
    }
    message(index) {
        const message = this._json.message;
        if (!message)
            return null;
        if (message.oneOf && message.oneOf.length === 1)
            return new message_1.Message(message.oneOf[0]);
        if (!message.oneOf)
            return new message_1.Message(message);
        if (typeof index !== 'number')
            return null;
        if (index > message.oneOf.length - 1)
            return null;
        return new message_1.Message(message.oneOf[+index]);
    }
}
exports.Operation = Operation;
