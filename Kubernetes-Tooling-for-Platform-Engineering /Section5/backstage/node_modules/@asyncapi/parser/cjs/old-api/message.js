"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const message_trait_1 = require("./message-trait");
const schema_1 = require("./schema");
const constants_1 = require("../constants");
class Message extends message_trait_1.MessageTrait {
    uid() {
        return this.id() || this.name() || this.ext(constants_1.xParserMessageName);
    }
    payload() {
        if (!this._json.payload)
            return null;
        return new schema_1.Schema(this._json.payload);
    }
    traits() {
        const traits = this.ext(constants_1.xParserOriginalTraits) || this._json.traits;
        if (!traits)
            return [];
        return traits.map(t => new message_trait_1.MessageTrait(t));
    }
    hasTraits() {
        return !!this.ext(constants_1.xParserOriginalTraits) || !!this._json.traits;
    }
    originalPayload() {
        return this.ext(constants_1.xParserOriginalPayload) || this.payload();
    }
    originalSchemaFormat() {
        return this.ext(constants_1.xParserOriginalSchemaFormat) || this.schemaFormat();
    }
}
exports.Message = Message;
