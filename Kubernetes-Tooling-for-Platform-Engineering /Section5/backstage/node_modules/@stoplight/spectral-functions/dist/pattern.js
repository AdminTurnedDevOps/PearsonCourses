"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const optionSchemas_1 = require("./optionSchemas");
const REGEXP_PATTERN = /^\/(.+)\/([a-z]*)$/;
const cache = new Map();
function getFromCache(pattern) {
    const existingPattern = cache.get(pattern);
    if (existingPattern !== void 0) {
        existingPattern.lastIndex = 0;
        return existingPattern;
    }
    const newPattern = createRegex(pattern);
    cache.set(pattern, newPattern);
    return newPattern;
}
function createRegex(pattern) {
    const splitRegex = REGEXP_PATTERN.exec(pattern);
    if (splitRegex !== null) {
        return new RegExp(splitRegex[1], splitRegex[2]);
    }
    else {
        return new RegExp(pattern);
    }
}
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'string',
    },
    options: optionSchemas_1.optionSchemas.pattern,
}, function pattern(targetVal, opts) {
    let results;
    if ('match' in opts) {
        const pattern = getFromCache(opts.match);
        if (!pattern.test(targetVal)) {
            results = [
                {
                    message: `#{{print("value")}} must match the pattern ${(0, spectral_runtime_1.printValue)(opts.match)}`,
                },
            ];
        }
    }
    if ('notMatch' in opts) {
        const pattern = getFromCache(opts.notMatch);
        if (pattern.test(targetVal)) {
            (results !== null && results !== void 0 ? results : (results = [])).push({
                message: `#{{print("value")}} must not match the pattern ${(0, spectral_runtime_1.printValue)(opts.notMatch)}`,
            });
        }
    }
    return results;
});
//# sourceMappingURL=pattern.js.map