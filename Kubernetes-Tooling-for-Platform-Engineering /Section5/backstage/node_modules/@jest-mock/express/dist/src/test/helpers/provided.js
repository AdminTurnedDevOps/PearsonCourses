"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providedMediaTypeArray = exports.providedParams = exports.providedStringObject = exports.providedSocket = exports.providedRes = exports.providedReq = exports.providedApp = exports.providedObject = exports.providedFunction = exports.providedStringArray = exports.providedString = exports.providedBoolean = exports.providedNumber = void 0;
exports.providedNumber = 123;
exports.providedBoolean = true;
exports.providedString = 'Provided String';
exports.providedStringArray = ['One', 'Two', 'Three', 'Four'];
exports.providedFunction = jest.fn().mockName('Provided Mock Function');
exports.providedObject = {
    one: {
        two: 'three',
    },
    four: ['five'],
};
exports.providedApp = {
    settings: {
        one: 'two',
    },
};
exports.providedReq = {
    path: 'value',
};
exports.providedRes = {
    chunkedEncoding: true,
};
exports.providedSocket = {
    connecting: true,
};
exports.providedStringObject = {
    one: 'two',
    three: 'four',
};
exports.providedParams = {
    one: 'two',
    three: 'four',
};
exports.providedMediaTypeArray = [
    {
        value: 'value',
        quality: 1,
        type: 'type',
        subtype: 'subtype',
    },
];
//# sourceMappingURL=provided.js.map