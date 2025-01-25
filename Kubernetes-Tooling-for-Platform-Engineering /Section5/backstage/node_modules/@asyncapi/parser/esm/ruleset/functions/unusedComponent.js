import { unreferencedReusableObject } from '@stoplight/spectral-functions';
import { createRulesetFunction } from '@stoplight/spectral-core';
import { isObject } from '../../utils';
export const unusedComponent = createRulesetFunction({
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
}, (targetVal, _, context) => {
    const components = targetVal.components;
    const results = [];
    Object.keys(components).forEach(componentType => {
        // if component type is `securitySchemes` we skip the validation
        // security schemes in >=2.x.x are referenced by keys, not by object ref - for this case we have a separate `asyncapi2-unused-securityScheme` rule
        if (componentType === 'securitySchemes') {
            return;
        }
        const value = components[componentType];
        if (!isObject(value)) {
            return;
        }
        const resultsForType = unreferencedReusableObject(value, { reusableObjectsLocation: `#/components/${componentType}` }, context);
        if (resultsForType && Array.isArray(resultsForType)) {
            results.push(...resultsForType);
        }
    });
    return results;
});
