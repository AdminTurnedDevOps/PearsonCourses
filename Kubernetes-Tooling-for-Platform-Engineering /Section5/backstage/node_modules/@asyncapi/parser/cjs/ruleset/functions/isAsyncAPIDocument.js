"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncAPIDocument = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
exports.isAsyncAPIDocument = (0, spectral_core_1.createRulesetFunction)({
    input: null,
    options: null,
}, (targetVal) => {
    if (!(0, utils_1.isObject)(targetVal) || typeof targetVal.asyncapi !== 'string') {
        return [
            {
                message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
                path: [],
            }
        ];
    }
    if (!constants_1.specVersions.includes(targetVal.asyncapi)) {
        return [
            {
                message: `Version "${targetVal.asyncapi}" is not supported. Please use "${constants_1.lastVersion}" (latest) version of the specification.`,
                path: [],
            }
        ];
    }
});
