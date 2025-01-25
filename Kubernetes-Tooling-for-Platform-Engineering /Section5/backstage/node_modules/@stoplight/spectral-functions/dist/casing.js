"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasingType = void 0;
const lodash_1 = require("lodash");
const spectral_core_1 = require("@stoplight/spectral-core");
const optionSchemas_1 = require("./optionSchemas");
const types_1 = require("./types");
Object.defineProperty(exports, "CasingType", { enumerable: true, get: function () { return types_1.CasingType; } });
const CASES = {
    [types_1.CasingType.flat]: '[a-z][a-z{__DIGITS__}]*',
    [types_1.CasingType.camel]: '[a-z][a-z{__DIGITS__}]*(?:[A-Z{__DIGITS__}](?:[a-z{__DIGITS__}]+|$))*',
    [types_1.CasingType.pascal]: '[A-Z][a-z{__DIGITS__}]*(?:[A-Z{__DIGITS__}](?:[a-z{__DIGITS__}]+|$))*',
    [types_1.CasingType.kebab]: '[a-z][a-z{__DIGITS__}]*(?:-[a-z{__DIGITS__}]+)*',
    [types_1.CasingType.cobol]: '[A-Z][A-Z{__DIGITS__}]*(?:-[A-Z{__DIGITS__}]+)*',
    [types_1.CasingType.snake]: '[a-z][a-z{__DIGITS__}]*(?:_[a-z{__DIGITS__}]+)*',
    [types_1.CasingType.macro]: '[A-Z][A-Z{__DIGITS__}]*(?:_[A-Z{__DIGITS__}]+)*',
};
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'string',
        minLength: 1,
    },
    options: optionSchemas_1.optionSchemas.casing,
}, function casing(targetVal, opts) {
    if (targetVal.length === 1 &&
        opts.separator !== void 0 &&
        opts.separator.allowLeading === true &&
        targetVal === opts.separator.char) {
        return;
    }
    const casingValidator = buildFrom(CASES[opts.type], opts);
    if (casingValidator.test(targetVal)) {
        return;
    }
    return [
        {
            message: `must be ${opts.type} case`,
        },
    ];
});
const DIGITS_PATTERN = '0-9';
const buildFrom = (basePattern, overrides) => {
    const injectDigits = overrides.disallowDigits !== true;
    const pattern = basePattern.replace(/\{__DIGITS__\}/g, injectDigits ? DIGITS_PATTERN : '');
    if (overrides.separator === undefined) {
        return new RegExp(`^${pattern}$`);
    }
    const separatorPattern = `[${(0, lodash_1.escapeRegExp)(overrides.separator.char)}]`;
    const leadingSeparatorPattern = overrides.separator.allowLeading === true ? `${separatorPattern}?` : '';
    return new RegExp(`^${leadingSeparatorPattern}${pattern}(?:${separatorPattern}${pattern})*$`);
};
//# sourceMappingURL=casing.js.map