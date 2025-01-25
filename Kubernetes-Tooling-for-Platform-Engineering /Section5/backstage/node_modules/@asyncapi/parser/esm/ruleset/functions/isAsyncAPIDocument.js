import { createRulesetFunction } from '@stoplight/spectral-core';
import { specVersions, lastVersion } from '../../constants';
import { isObject } from '../../utils';
export const isAsyncAPIDocument = createRulesetFunction({
    input: null,
    options: null,
}, (targetVal) => {
    if (!isObject(targetVal) || typeof targetVal.asyncapi !== 'string') {
        return [
            {
                message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
                path: [],
            }
        ];
    }
    if (!specVersions.includes(targetVal.asyncapi)) {
        return [
            {
                message: `Version "${targetVal.asyncapi}" is not supported. Please use "${lastVersion}" (latest) version of the specification.`,
                path: [],
            }
        ];
    }
});
