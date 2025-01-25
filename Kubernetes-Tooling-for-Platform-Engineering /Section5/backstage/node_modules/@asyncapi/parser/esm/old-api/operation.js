import { OperationTrait } from './operation-trait';
import { Message } from './message';
export class Operation extends OperationTrait {
    traits() {
        const traits = this._json['x-parser-original-traits'] || this._json.traits;
        if (!traits)
            return [];
        return traits.map(t => new OperationTrait(t));
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
            return message.oneOf.map(m => new Message(m));
        return [new Message(message)];
    }
    message(index) {
        const message = this._json.message;
        if (!message)
            return null;
        if (message.oneOf && message.oneOf.length === 1)
            return new Message(message.oneOf[0]);
        if (!message.oneOf)
            return new Message(message);
        if (typeof index !== 'number')
            return null;
        if (index > message.oneOf.length - 1)
            return null;
        return new Message(message.oneOf[+index]);
    }
}
