"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const replacer_1 = require("../../utils/replacer");
const MessageReplacer = new replacer_1.Replacer(2);
MessageReplacer.addFunction('print', function (type) {
    if (typeof type !== 'string')
        return '';
    const { property, value } = this;
    switch (type) {
        case 'property':
            if (property !== void 0 && property !== '') {
                return `"${property}" property `;
            }
            return `The document `;
        case 'value':
            return (0, spectral_runtime_1.printValue)(value);
        default:
            if (type in this && this[type] !== null) {
                return String(this[type]);
            }
            return '';
    }
});
exports.message = MessageReplacer.print.bind(MessageReplacer);
//# sourceMappingURL=message.js.map