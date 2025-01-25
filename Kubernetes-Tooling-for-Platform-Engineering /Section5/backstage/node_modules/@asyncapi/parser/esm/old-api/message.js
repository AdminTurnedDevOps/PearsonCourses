import { MessageTrait } from './message-trait';
import { Schema } from './schema';
import { xParserMessageName, xParserOriginalTraits, xParserOriginalPayload, xParserOriginalSchemaFormat } from '../constants';
export class Message extends MessageTrait {
    uid() {
        return this.id() || this.name() || this.ext(xParserMessageName);
    }
    payload() {
        if (!this._json.payload)
            return null;
        return new Schema(this._json.payload);
    }
    traits() {
        const traits = this.ext(xParserOriginalTraits) || this._json.traits;
        if (!traits)
            return [];
        return traits.map(t => new MessageTrait(t));
    }
    hasTraits() {
        return !!this.ext(xParserOriginalTraits) || !!this._json.traits;
    }
    originalPayload() {
        return this.ext(xParserOriginalPayload) || this.payload();
    }
    originalSchemaFormat() {
        return this.ext(xParserOriginalSchemaFormat) || this.schemaFormat();
    }
}
