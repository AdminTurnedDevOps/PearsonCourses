import { createRulesetFunction } from '@stoplight/spectral-core';
import { isObject } from '../../../utils';
const oAuth2Keys = ['implicit', 'password', 'clientCredentials', 'authorizationCode'];
function getAllScopes(oauth2) {
    const scopes = [];
    oAuth2Keys.forEach(key => {
        const flow = oauth2[key];
        if (isObject(flow)) {
            scopes.push(...Object.keys(flow.scopes));
        }
    });
    return Array.from(new Set(scopes));
}
export const security = createRulesetFunction({
    input: {
        type: 'object',
        additionalProperties: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    options: {
        type: 'object',
        properties: {
            objectType: {
                type: 'string',
                enum: ['Server', 'Operation'],
            },
        },
    },
}, (targetVal = {}, { objectType }, ctx) => {
    var _a, _b;
    const results = [];
    const spec = ctx.document.data;
    const securitySchemes = (_b = (_a = spec === null || spec === void 0 ? void 0 : spec.components) === null || _a === void 0 ? void 0 : _a.securitySchemes) !== null && _b !== void 0 ? _b : {};
    const securitySchemesKeys = Object.keys(securitySchemes);
    Object.keys(targetVal).forEach(securityKey => {
        var _a;
        if (!securitySchemesKeys.includes(securityKey)) {
            results.push({
                message: `${objectType} must not reference an undefined security scheme.`,
                path: [...ctx.path, securityKey],
            });
        }
        const securityScheme = securitySchemes[securityKey];
        if ((securityScheme === null || securityScheme === void 0 ? void 0 : securityScheme.type) === 'oauth2') {
            const availableScopes = getAllScopes((_a = securityScheme.flows) !== null && _a !== void 0 ? _a : {});
            targetVal[securityKey].forEach((securityScope, index) => {
                if (!availableScopes.includes(securityScope)) {
                    results.push({
                        message: `Non-existing security scope for the specified security scheme. Available: [${availableScopes.join(', ')}]`,
                        path: [...ctx.path, securityKey, index],
                    });
                }
            });
        }
    });
    return results;
});
