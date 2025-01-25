"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unusedSecuritySchemes = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const utils_1 = require("../utils");
const utils_2 = require("../../../utils");
exports.unusedSecuritySchemes = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            components: {
                type: 'object',
            },
        },
        required: ['components'],
    },
    options: null,
}, (targetVal) => {
    var _a;
    const securitySchemes = (_a = targetVal.components) === null || _a === void 0 ? void 0 : _a.securitySchemes;
    if (!(0, utils_2.isObject)(securitySchemes)) {
        return;
    }
    const usedSecuritySchemes = [];
    // collect all security requirements from servers
    if ((0, utils_2.isObject)(targetVal.servers)) {
        Object.values(targetVal.servers).forEach(server => {
            if (Array.isArray(server.security)) {
                server.security.forEach(requirements => {
                    usedSecuritySchemes.push(...Object.keys(requirements));
                });
            }
        });
    }
    // collect all security requirements from operations
    const operations = (0, utils_1.getAllOperations)(targetVal);
    for (const { operation } of operations) {
        if (Array.isArray(operation.security)) {
            operation.security.forEach(requirements => {
                usedSecuritySchemes.push(...Object.keys(requirements));
            });
        }
    }
    const usedSecuritySchemesSet = new Set(usedSecuritySchemes);
    const securitySchemesKinds = Object.keys(securitySchemes);
    const results = [];
    securitySchemesKinds.forEach(securitySchemeKind => {
        if (!usedSecuritySchemesSet.has(securitySchemeKind)) {
            results.push({
                message: 'Potentially unused security scheme has been detected in AsyncAPI document.',
                path: ['components', 'securitySchemes', securitySchemeKind],
            });
        }
    });
    return results;
});
